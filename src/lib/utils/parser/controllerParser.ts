import { ApigenConfig } from '../../config/apigenConfig';
import { IApi, IParameter, IPaths, IResponse, IRestApi, IStatus, ITag, MethodType, PrimitiveTypes } from '../../defines/openApi';
import { ApiInfo, ControllerInfo, JsonBody, MethodInfo, QueryParam, ResponseInfo, RequestInfo } from '../../defines/controllerInfo';
import { TypeNameParser } from './typeNameParser';
import { CaseStyleFormatter } from '../string/caseStyleFormatter';

export namespace ControllerParser {
    const controllerDescriptionByName = new Map<string, string>();

    // 컨트롤러마다 API 정보 리스트를 가짐
    export function getControllerInfoByController(tags: ITag[], paths: IPaths): Map<string, ControllerInfo> {
        setControllerDescriptionByName(tags);

        const controllerInfoByController = new Map<string, ControllerInfo>();
        const controllerSet = new Set<string>(ApigenConfig.config.controllerNames ?? []);
        let hasMultiRootUrl = false;

        Object.entries(paths).forEach(([path, restApi]) => {
            const controller: string = getController(restApi);
            if (ApigenConfig.config.selectedControllerType === 'INCLUDE') {
                if (controllerSet.size > 0 && !controllerSet.has(controller)) {
                    return;
                }
            } else if (ApigenConfig.config.selectedControllerType === 'EXCLUDE') {
                if (controllerSet.has(controller)) {
                    return;
                }
            }

            const controllerInfo = controllerInfoByController.get(controller);
            const refSet: Set<string> = controllerInfo?.refSet ?? new Set();

            const methodInfoList: MethodInfo[] = Object.entries(restApi).map(([methodType, api]) => {
                const { responses, operationId, summary } = api;

                const request: RequestInfo | null = getRequestInfo(api, path, refSet);
                const response: ResponseInfo | null = getResponseInfo(responses, refSet);

                hasMultiRootUrl = getHasMultiRootUrl(operationId);

                return {
                    methodName: getMethodNameFromOperationId(operationId),
                    methodType: methodType as MethodType,
                    methodSummary: summary,
                    request,
                    response,
                };
            });

            const apiInfo: ApiInfo = {
                path,
                methodInfoList,
            };

            if (controllerInfo) {
                const { apiInfoList } = controllerInfo;
                controllerInfoByController.set(controller, {
                    refSet,
                    apiInfoList: [...apiInfoList, apiInfo],
                    hasMultiRootUrl,
                });
                return;
            }
            controllerInfoByController.set(controller, {
                refSet,
                apiInfoList: [apiInfo],
                hasMultiRootUrl,
            });
        });

        return controllerInfoByController;
    }

    function setControllerDescriptionByName(tags: ITag[]) {
        tags.forEach(({ name, description }) => {
            controllerDescriptionByName.set(CaseStyleFormatter.kebabCaseToPascalCase(name), description.replace(/\s/g, ''));
        });
    }

    function getController(restApi: Omit<IRestApi, 'path'>): string {
        const name = CaseStyleFormatter.kebabCaseToPascalCase(Object.values(restApi)[0].tags[0]);
        return controllerDescriptionByName.get(name) ?? '';
    }

    function getQueryParamList(parameterList: IParameter[]): QueryParam[] {
        parameterList.sort((param1, param2) => {
            const getValue = (required: boolean) => {
                return required ? 0 : 1;
            };
            return getValue(param1.required) - getValue(param2.required);
        });

        return parameterList.map((param) => {
            const { name, required, type, items } = param;

            return {
                name,
                type: TypeNameParser.getTypeNameFromSchema({ type, items }) as PrimitiveTypes,
                required,
            };
        });
    }

    function getJson(parameterList: IParameter[], refSet: Set<string>): JsonBody {
        const { name, required, schema } = parameterList[0];
        return {
            name,
            type: TypeNameParser.getTypeNameFromSchema(schema, refSet),
            required,
        };
    }

    function getRequestInfo(api: IApi, path: string, refSet: Set<string>): RequestInfo | null {
        if (!api.parameters) {
            return null;
        }

        const parameterList: IParameter[] = Object.values(api.parameters);
        if (parameterList[0].in === 'query') {
            return {
                contentType: 'formData',
                queryParamList: getQueryParamList(parameterList),
                jsonBody: null,
            };
        } else if (parameterList[0].in === 'body') {
            return {
                contentType: 'json',
                queryParamList: null,
                jsonBody: getJson(parameterList, refSet),
            };
        } else {
            console.error(path, 'request parameter 이상', parameterList);
            return null;
        }
    }

    function getMethodNameFromOperationId(operationId: string) {
        return operationId.substring(0, operationId.indexOf('Using'));
    }

    function getHasMultiRootUrl(operationId: string) {
        return /_[0-9]/.test(operationId);
    }

    function getResponseInfo(responses: IResponse, refSet: Set<string>): ResponseInfo | null {
        const status: IStatus | null = responses[200] ?? null;

        if (!status || !status?.schema) {
            return null;
        }

        return {
            type: TypeNameParser.getTypeNameFromSchema(status.schema, refSet),
        };
    }
}
