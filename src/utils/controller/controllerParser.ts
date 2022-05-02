import { IApi, IParameter, IPaths, IResponse, IRestApi, IStatus, MethodType, PrimitiveTypes } from '../../defines/SwaggerJson';
import { ApiInfo, ControllerInfo, JsonBody, MethodInfo, QueryParam, RequestInfo, ResponseInfo } from '../../defines/ControllerInfo';
const { getTypeNameFromSchema } = require('../common/typeNameParser');

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

const getJson = (parameterList: IParameter[]): JsonBody => {
    const { name, required, schema } = parameterList[0];
    return {
        name,
        type: getTypeNameFromSchema(schema),
        required,
    };
};

// 요청 정보
const getRequestInfo = (api: IApi, path: string): RequestInfo | null => {
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
            jsonBody: getJson(parameterList),
        };
    } else {
        console.error(path, 'request parameter 이상');
        return null;
    }
};

// 응답 정보
const getResponseInfo = (responses: IResponse): ResponseInfo | null => {
    const status: IStatus | null = responses[200] ?? null;

    if (!status || !status?.schema) {
        return null;
    }

    return {
        type: getTypeNameFromSchema(status.schema),
    };
};

// 컨트롤러마다 API 정보 리스트를 가짐
const getControllerInfoByController = (paths: IPaths): Map<string, ControllerInfo> => {
    const controllerInfoByController = new Map<string, ControllerInfo>();

    Object.entries(paths).forEach(([path, restApi]) => {
        const controller: string = getController(restApi);

        const methodInfoList: MethodInfo[] = Object.entries(restApi).map(([methodType, api]) => {
            const request: RequestInfo | null = getRequestInfo(api, path);
            const response: ResponseInfo | null = getResponseInfo(api.responses);

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

        const controllerInfo = controllerInfoByController.get(controller);
        if (controllerInfo) {
            controllerInfoByController.set(controller, {
                apiInfoList: [...controllerInfo.apiInfoList, apiInfo],
            });
            return;
        }
        controllerInfoByController.set(controller, {
            apiInfoList: [apiInfo],
        });
    });

    return controllerInfoByController;
};

module.exports = {
    getControllerInfoByController,
};
