export interface OpenApi {
    // 2.0
    swagger?: string;
    // 3.0
    openapi?: string;
    info?: any;
    // 3.0
    servers?: IServer[];
    tags: ITag[];
    paths: IPaths;
    // 2.0
    definitions?: IDefinitions;
    // 3.0
    components?: IComponents;
}

export interface IServer {
    url: string;
    description: string;
}

export type IPaths = {
    [key in string]: Omit<IRestApi, 'path'>;
};

export type IDefinitions = {
    [key in string]: IObjectInfo;
};

export type IComponents = {
    [key in ComponentType]?: IDefinitions;
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
    // 3.0
    requestBody?: IRequestBody;
    responses: IResponse;
}

export interface IParameter {
    in: 'query' | 'body';
    name: string;
    description?: string;
    required: boolean;
    schema: ISchema;
    type?: PrimitiveTypes;
    items?: ISchema;
    style?: string;
}

export type IResponse = {
    [key in StatusCode]?: IStatus;
};

export interface IStatus {
    description: string;
    schema?: ISchema;
    // 3.0
    content?: IContent;
}

export interface IObjectInfo {
    title?: string;
    // 3.0
    required?: string[];
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
    description?: string;
}

export interface IRequestBody {
    content: IContent;
}

export type IContent = {
    [key in ContentType]?: {
        schema: ISchema;
    };
};

export type StatusCode = '200' | `${number}`;

export type PrimitiveTypes = 'number' | 'integer' | 'boolean' | 'array' | 'object' | 'string';

export type MethodType = 'get' | 'post' | 'head' | 'put' | 'delete' | 'options' | 'patch' | 'trace';

export type ContentType = 'application/json' | 'text/html' | '*/*';

export type ComponentType =
    | 'schemas'
    | 'responses'
    | 'parameters'
    | 'examples'
    | 'requestBodies'
    | 'headers'
    | 'securitySchemes'
    | 'links'
    | 'callbacks';
