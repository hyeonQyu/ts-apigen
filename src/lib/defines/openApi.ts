export interface OpenApi {
    tags: ITag[];
    paths: IPaths;
    definitions: IDefinitions;
}

export type IPaths = {
    [key in string]: Omit<IRestApi, 'path'>;
};

export type IDefinitions = {
    [key in string]: IObjectInfo;
};

export interface ITag {
    name: string;
    description: string;
}

export type IRestApi = {
    [key in MethodType]?: IApi;
} & { path: string };

export interface IApi {
    tags: string[];
    summary: string;
    operationId: string;
    parameters?: IParameter[];
    responses: IResponse;
}

export interface IParameter {
    in: 'query' | 'body';
    name: string;
    description: string;
    required: boolean;
    schema: ISchema;
    type?: PrimitiveTypes;
    items?: ISchema;
}

export type IResponse = {
    [key in StatusCode]?: IStatus;
};

export interface IStatus {
    description: string;
    schema?: ISchema;
}

export interface IObjectInfo {
    type: PrimitiveTypes;
    properties: IProperties;
}

export type IProperties = {
    [key in string]: ISchema;
};

export interface ISchema {
    $ref?: string;
    type?: PrimitiveTypes;
    items?: ISchema;
    enum?: string[];
}

export type StatusCode = '200' | '201' | '401' | '403' | '404';

export type PrimitiveTypes = 'number' | 'integer' | 'boolean' | 'array' | 'object' | 'string';

export type MethodType = 'get' | 'post' | 'head' | 'put' | 'delete' | 'options' | 'patch';
