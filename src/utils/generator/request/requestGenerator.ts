import { ApiInfo, ByContentType, ControllerInfo, RequestInfo, ResponseInfo } from '../../../defines/controllerInfo';
import { ApigenConfig } from '../../../config/apigenConfig';
import { ImportGenerator } from '../import/importGenerator';
import { PrettierParser } from '../../parser/prettierParser';
import { MethodType } from '../../../defines/swaggerJson';
import { RequestCommonGenerator } from './requestCommonGenerator';

const prettier = require('prettier');
const fs = require('fs');

export namespace RequestGenerator {
    const { requestApi } = ApigenConfig.config;

    /**
     * 요청 코드 생성
     * @param controllerInfoByController
     */
    export function generateRequests(controllerInfoByController: Map<string, ControllerInfo>) {
        RequestCommonGenerator.generateCommonCode();

        controllerInfoByController.forEach((controllerInfo, controllerName) => {
            console.log('controller 이름', controllerName);
            console.log('controller 정보', controllerInfo);

            const { refSet, apiInfoList } = controllerInfo;
            const name = controllerName.replace('Controller', 'Request');

            let ts = `
                import { RequestCommon } from './RequestCommon';
                ${ImportGenerator.getImportCode(refSet, '../models')}
                export namespace ${name} {
                    ${getAllRequestFunctionCodeOfController(apiInfoList)}
                }
            `;

            fs.writeFileSync(
                `${ApigenConfig.config.generatedCodePath}/requests/${name}.ts`,
                prettier.format(ts, PrettierParser.prettierConfig),
            );
        });
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
                    export async function ${functionName}(${getRequestCode(request)}): Promise<${responseType}> {
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
                    .join();

            case 'json':
                if (!jsonBody) {
                    return '';
                }
                const { name, type, required } = jsonBody;
                return getRequestCommonCode(name, type, required);

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
                return `${(() => {
                    switch (methodType) {
                        case 'get':
                            return getAxiosGetCode(path, hasBody ? axiosDataMap[contentType] : '{}', `{${configHeader}}`, responseType);
                        case 'post':
                            return getAxiosPostCode(path, hasBody ? axiosDataMap[contentType] : '{}', `{${configHeader}}`, responseType);
                    }
                })()}`;
        }
    }

    function getAxiosGetCode(path: string, param: string, config: string, responseType: string): string {
        return `return (await RequestCommon.axiosGet<${responseType}>(\'${path}\', ${param}, ${config})).data;`;
    }

    function getAxiosPostCode(path: string, param: string, config: string, responseType: string): string {
        return `return (await RequestCommon.axiosPost<${responseType}>(\'${path}\', ${param}, ${config})).data`;
    }
}
