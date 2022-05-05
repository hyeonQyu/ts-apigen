import { ApigenConfig } from '../../config/apigenConfig';
import { IApi, IParameter, IPaths, IResponse, IRestApi, IStatus, MethodType, PrimitiveTypes } from '../../defines/swaggerJson';
import { ApiInfo, ControllerInfo, JsonBody, MethodInfo, QueryParam, ResponseInfo, RequestInfo } from '../../defines/controllerInfo';
import { TypeNameParser } from './typeNameParser';

export namespace ControllerParser {
    // 컨트롤러마다 API 정보 리스트를 가짐
    export function getControllerInfoByController(paths: IPaths): Map<string, ControllerInfo> {
        const controllerInfoByController = new Map<string, ControllerInfo>();
        const controllerSet = new Set<string>(ApigenConfig.config.controllerList ?? []);

        Object.entries(paths).forEach(([path, restApi]) => {
            const controller: string = getController(restApi);
            if (!controllerSet.has(controller)) {
                return;
            }

            const controllerInfo = controllerInfoByController.get(controller);
            const refSet: Set<string> = controllerInfo?.refSet ?? new Set();

            const methodInfoList: MethodInfo[] = Object.entries(restApi).map(([methodType, api]) => {
                const request: RequestInfo | null = getRequestInfo(api, path, refSet);
                const response: ResponseInfo | null = getResponseInfo(api.responses, refSet);

                return {
                    methodName: api.summary,
                    methodType: methodType as MethodType,
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
                });
                return;
            }
            controllerInfoByController.set(controller, {
                refSet,
                apiInfoList: [apiInfo],
            });
        });

        return controllerInfoByController;
    }

    function getController(restApi: Omit<IRestApi, 'path'>): string {
        return Object.values(restApi)[0].tags[0];
    }

    function getQueryParamList(parameterList: IParameter[]): QueryParam[] {
        return parameterList.map((param) => {
            const { name, required, type } = param;

            return {
                name,
                type: (type === 'integer' ? 'number' : type) as PrimitiveTypes,
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
            console.error(path, 'request parameter 이상');
            return null;
        }
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
