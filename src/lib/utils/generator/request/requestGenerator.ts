import { ApiInfo, ByContentType, ControllerInfo, RequestInfo, ResponseInfo } from '../../../defines/controllerInfo';
import { ApigenConfig } from '../../../config/apigenConfig';
import { ImportGenerator } from '../import/importGenerator';
import { MethodType } from '../../../defines/openApi';
import { RequestCommonGenerator } from './requestCommonGenerator';
import { CaseStyleFormatter } from '../../string/caseStyleFormatter';

const prettier = require('prettier');
const fs = require('fs');

export namespace RequestGenerator {
    const { requestApi } = ApigenConfig.config;

    const contentTypeCount = {
        json: 0,
        formData: 0,
        init() {
            this.json = 0;
            this.formData = 0;
        },
    };

    /**
     * 요청 코드 생성
     * @param controllerInfoByController
     */
    export function generateRequests(controllerInfoByController: Map<string, ControllerInfo>) {
        RequestCommonGenerator.generateCommonCode();

        controllerInfoByController.forEach((controllerInfo, controllerName) => {
            console.log('controller 이름', controllerName);
            console.log('controller 정보', controllerInfo);

            const { refSet, apiInfoList, hasMultiRootUrl } = controllerInfo;
            const name = controllerName.replace('Controller', 'Request');

            const ts = `
                import { AxiosRequestConfig } from 'axios';
                import { RequestCommon } from './requestCommon';
                ${ImportGenerator.getImportCode(refSet, '../models')}
                export namespace ${name} {
                    ${
                        hasMultiRootUrl && ApigenConfig.config.baseRootList.length > 0
                            ? getNamespaceCodeByBaseRoot(apiInfoList)
                            : getAllRequestFunctionCodeOfController(apiInfoList)
                    }
                }
            `;

            writeFile(CaseStyleFormatter.PascalCaseToCamelCase(name), ts);

            contentTypeCount.init();
        });
    }

    /**
     * base root 존재에 따른 namespace 별 코드 생성
     * @param apiInfoList
     * @private
     */
    function getNamespaceCodeByBaseRoot(apiInfoList: ApiInfo[]): string {
        const namespaceCodes: string[] = [];

        getApiInfoListByBaseRoot(apiInfoList).forEach((apiInfoList, baseRoot) => {
            if (apiInfoList.length === 0) {
                return;
            }

            namespaceCodes.push(`
                export namespace ${CaseStyleFormatter.baseRootToPascalCase(baseRoot)} {
                    ${getAllRequestFunctionCodeOfController(apiInfoList)}
                }
            `);
        });

        return namespaceCodes.join('\n');
    }

    /**
     * baseRoot 별 API 정보 목록 Map 반환
     * @param apiInfoList
     * @private
     */
    function getApiInfoListByBaseRoot(apiInfoList: ApiInfo[]): Map<string, ApiInfo[]> {
        const isBaseRootInPath = (path: string, baseRoot: string): boolean => path.indexOf(baseRoot) > -1;

        const { baseRootList } = ApigenConfig.config;
        const apiInfoListByBaseRoot = new Map<string, ApiInfo[]>(baseRootList.map((baseRoot) => [baseRoot, []]));
        let baseRoot = baseRootList[0];
        const { length } = baseRootList;

        apiInfoList.forEach((apiInfo) => {
            const { path } = apiInfo;

            if (!isBaseRootInPath(path, baseRoot)) {
                for (let i = 0; i < length; i++) {
                    const tmpBaseRoot = baseRootList[i];
                    if (isBaseRootInPath(path, baseRootList[i])) {
                        baseRoot = tmpBaseRoot;
                        break;
                    }
                }
            }

            apiInfoListByBaseRoot.get(baseRoot)?.push(apiInfo);
        });

        return apiInfoListByBaseRoot;
    }

    /**
     * 해당 파일에 속한 모든 API 리스트를 함수로 변환
     * @param apiInfoList
     * @private
     */
    function getAllRequestFunctionCodeOfController(apiInfoList: ApiInfo[]): string {
        return apiInfoList.map((apiInfo) => getRequestFunctionCode(apiInfo)).join('\n');
    }

    /**
     * 하나의 API를 함수로 변환
     * @param apiInfo
     * @private
     */
    function getRequestFunctionCode(apiInfo: ApiInfo): string {
        const { path, methodInfoList } = apiInfo;
        const hasVariousMethodByPath = methodInfoList.length > 1;

        return methodInfoList
            .map(({ methodName, methodType, request, response }) => {
                const functionName = hasVariousMethodByPath ? `${methodName}_${methodType}` : methodName;
                const responseType = getResponseCode(response);
                return `
                    export async function ${functionName}(${getRequestCode(request)} config?: AxiosRequestConfig)
                    : Promise<${responseType}> {
                        ${getFunctionBodyCode(path, methodType, responseType, request ?? undefined)}
                    }
                `;
            })
            .join('\n');
    }

    /**
     * 코드에 삽입될 요청 인자 반환
     * @param request
     * @private
     */
    function getRequestCode(request: RequestInfo | null): string {
        if (!request) {
            return '';
        }

        const { contentType, jsonBody, queryParamList } = request;

        switch (contentType) {
            case 'formData':
                if (!queryParamList) {
                    return '';
                }
                return queryParamList
                    .map(({ name, type, required }) => {
                        return getRequestCommonCode(name, type, required);
                    })
                    .join()
                    .concat(',');

            case 'json':
                if (!jsonBody) {
                    return '';
                }
                const { name, type, required } = jsonBody;
                return getRequestCommonCode(name, type, required).concat(',');

            default:
                return '';
        }
    }

    function getRequestCommonCode(name: string, type: string, required: boolean): string {
        return `${name}${required ? '' : '?'}: ${type}`;
    }

    /**
     * 코드에 삽입될 응답 타입 반환
     * @param response
     * @private
     */
    function getResponseCode(response: ResponseInfo | null): string {
        return response ? response.type : 'void';
    }

    /**
     * http 통신 API 에 따른 코드 반환
     * @param path
     * @param methodType
     * @param responseType
     * @param request
     * @private
     */
    function getFunctionBodyCode(
        path: string,
        methodType: MethodType,
        responseType: string,
        request: RequestInfo = { contentType: 'json', jsonBody: null, queryParamList: null },
    ): string {
        const { contentType, jsonBody, queryParamList } = request;

        const contentTypeMap: ByContentType = {
            json: 'application/json',
            formData: 'application/x-www-form-urlencoded',
        };

        const fetchBodyMap: ByContentType = {
            json: `JSON.stringify(${jsonBody?.name})`,
            formData: `RequestCommon.createFormData({${queryParamList?.map(({ name }) => name).join()}})`,
        };

        const axiosDataMap: ByContentType = {
            json: jsonBody ? jsonBody.name : '{}',
            formData: fetchBodyMap.formData,
        };

        const hasFormDataBody = contentType === 'formData' && queryParamList;
        const hasJsonBody = contentType === 'json' && jsonBody;
        const hasBody = hasFormDataBody || hasJsonBody;

        const configHeader = `headers: { 'Content-Type': \'${contentTypeMap[contentType]}\' }`;

        switch (requestApi) {
            case 'fetch':
                return `
                    return await (await fetch(\'${path}\', {
                        method: \'${methodType.toUpperCase()}\',
                        ${configHeader},
                        ${hasBody ? `body: ${fetchBodyMap[contentType]}` : ''}
                    })).json();`;

            case 'axios':
                contentTypeCount[contentType]++;

                const param: string = hasBody ? axiosDataMap[contentType] : '{}';
                const config: string = `RequestCommon.get${CaseStyleFormatter.camelCaseToPascalCase(contentType)}Config(config)`;

                return getAxiosCode(methodType, path, param, config, responseType);
        }
    }

    function getAxiosCode(method: MethodType, path: string, param: string, config: string, responseType: string): string {
        switch (method) {
            case 'get':
            case 'post':
            case 'put':
            case 'delete':
            case 'patch':
                return `return RequestCommon.axios${CaseStyleFormatter.camelCaseToPascalCase(
                    method,
                )}<${responseType}>(\'${path}\', ${param}, ${config});`;

            case 'head':
            case 'options':
                return `return RequestCommon.axios${CaseStyleFormatter.camelCaseToPascalCase(
                    method,
                )}<${responseType}>(\'${path}\', ${config});`;
        }
    }

    function writeFile(fileName: string, ts: string) {
        const { prettierConfig, generatedCodePath } = ApigenConfig.config;
        try {
            fs.writeFileSync(`${generatedCodePath}/requests/${fileName}.ts`, prettier.format(ts, prettierConfig));
        } catch (e) {
            console.error('generate request', e);
            const errorFilePath = `${generatedCodePath}/requests/${fileName}Error.ts`;
            fs.writeFileSync(errorFilePath, ts);
            throw new Error(`Prettier 전환 중 에러가 발생했습니다. ${errorFilePath} 를 확인하세요.`);
        }
    }
}
