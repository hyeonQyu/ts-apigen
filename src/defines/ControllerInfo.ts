import { MethodType, PrimitiveTypes } from './SwaggerJson';

export interface ControllerInfo {
    refSet: Set<string>;
    apiInfoList: ApiInfo[];
}

export interface ApiInfo {
    path: string;
    methodInfoList: MethodInfo[];
}

export interface MethodInfo {
    methodName: string;
    methodType: MethodType;
    request: RequestInfo | null;
    response: ResponseInfo | null;
}

export interface RequestInfo {
    contentType: ContentType;
    queryParamList: QueryParam[] | null;
    jsonBody: JsonBody | null;
}

export interface QueryParam {
    name: string;
    type: PrimitiveTypes;
    required: boolean;
}

export interface JsonBody {
    name: string;
    type: string;
    required: boolean;
}

export interface ResponseInfo {
    type: string;
}

export type ContentType = 'formData' | 'json';
