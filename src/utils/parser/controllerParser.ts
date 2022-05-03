import { IApi, IParameter, IPaths, IResponse, IRestApi, IStatus, MethodType, PrimitiveTypes } from '../../defines/SwaggerJson';
import { ApiInfo, ControllerInfo, JsonBody, MethodInfo, QueryParam, RequestInfo, ResponseInfo } from '../../defines/ControllerInfo';
const { getTypeNameFromSchema } = require('./typeNameParser');

const getController = (restApi: Omit<IRestApi, 'path'>): string => Object.values(restApi)[0].tags[0];

const getQueryParamList = (parameterList: IParameter[]): QueryParam[] => {
    return parameterList.map((param) => {
        const { name, required, type } = param;

        return {
            name,
            type: (type === 'integer' ? 'number' : type) as PrimitiveTypes,
            required,
        };
    });
};

const getJson = (parameterList: IParameter[], refSet: Set<string>): JsonBody => {
    const { name, required, schema } = parameterList[0];
    return {
        name,
        type: getTypeNameFromSchema(schema, refSet),
        required,
    };
};

// 요청 정보
const getRequestInfo = (api: IApi, path: string, refSet: Set<string>): RequestInfo | null => {
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
};

// 응답 정보
const getResponseInfo = (responses: IResponse, refSet: Set<string>): ResponseInfo | null => {
    const status: IStatus | null = responses[200] ?? null;

    if (!status || !status?.schema) {
        return null;
    }

    return {
        type: getTypeNameFromSchema(status.schema, refSet),
    };
};

// 컨트롤러마다 API 정보 리스트를 가짐
const getControllerInfoByController = (paths: IPaths): Map<string, ControllerInfo> => {
    const controllerInfoByController = new Map<string, ControllerInfo>();

    Object.entries(paths).forEach(([path, restApi]) => {
        const controller: string = getController(restApi);
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
};

module.exports = {
    getControllerInfoByController,
};
