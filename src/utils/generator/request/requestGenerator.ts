import { ApiInfo, ByContentType, ControllerInfo, RequestInfo, ResponseInfo } from '../../../defines/controllerInfo';
import { ApigenConfig } from '../../../config/apigenConfig';
import { ImportGenerator } from '../import/importGenerator';
import { PrettierParser } from '../../parser/prettierParser';
import { MethodType } from '../../../defines/swaggerJson';

const prettier = require('prettier');
const fs = require('fs');

export namespace RequestGenerator {
    const { requestApi } = ApigenConfig.config;

    /**
     * 요청 코드 생성
     * @param controllerInfoByController
     */
    export function generateRequests(controllerInfoByController: Map<string, ControllerInfo>) {
        generateCommonCode();

        controllerInfoByController.forEach((controllerInfo, controllerName) => {
            console.log('controller 이름', controllerName);
            console.log('controller 정보', controllerInfo);

            const { refSet, apiInfoList } = controllerInfo;
            const name = controllerName.replace('Controller', 'Request');

            const ts = `
                import { RequestCommon } from './common';
                ${ImportGenerator.getImportCode(refSet, '../models')}
                export namespace ${name} {
                    ${getAllRequestFunctionCodeOfController(apiInfoList)}
                }
            `;

            console.log(ts);
            fs.writeFileSync(
                `${ApigenConfig.config.generatedCodePath}/requests/${name}.ts`,
                prettier.format(ts, PrettierParser.prettierConfig),
            );
        });
    }

    /**
     * 공통 코드 생성
     * @private
     */
    function generateCommonCode() {
        const ts = `
            export namespace RequestCommon {
                export function createFormData(data: object): FormData {
                    const formData = new FormData();
            
                    Object.entries(data).forEach(([key, value]) => {
                        if (value || value === false) {
                            if (Array.isArray(value)) {
                                formData.append(key, value.join());
                            } else if (value.constructor === File) {
                                formData.append(key, value);
                            } else {
                                formData.append(key, value.toString());
                            }
                        }
                    });
                    
                    return formData;
                }
            }
        `;

        fs.writeFileSync(`${ApigenConfig.config.generatedCodePath}/requests/common.ts`, prettier.format(ts, PrettierParser.prettierConfig));
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
                return `
                    export async function ${functionName}(${getRequestCode(request)}): Promise<${getResponseCode(response)}> {
                        ${getFunctionBodyCode(path, methodType, request ?? undefined)}
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
     * @param request
     * @private
     */
    function getFunctionBodyCode(
        path: string,
        methodType: MethodType,
        request: RequestInfo = { contentType: 'json', jsonBody: null, queryParamList: null },
    ): string {
        const { contentType, jsonBody, queryParamList } = request;

        const contentTypeMap: ByContentType = {
            json: 'application/json',
            formData: 'application/x-www-form-urlencoded',
        };

        const bodyMap: ByContentType = {
            json: `JSON.stringify(${jsonBody?.name})`,
            formData: `RequestCommon.createFormData({${queryParamList ? queryParamList.map(({ name }) => name).join() : ''}})`,
        };

        switch (requestApi) {
            case 'fetch':
                return `
                    return await (await fetch(\'${path}\', {
                        method: \'${methodType.toUpperCase()}\',
                        headers: { 'Content-Type': \'${contentTypeMap[contentType]}\' },
                        body: ${bodyMap[contentType]}
                    })).json();`;
            case 'axios':
                return '';
        }
    }
}
