export interface SwaggerJson {
    tags: any[];
    paths: IPaths;
    definitions: IDefinitions;
}

export type IPaths = {
    [key in string]: Omit<IRestApi, 'path'>;
};

export type IDefinitions = {
    [key in string]: IObjectInfo;
};

export type IRestApi = {
    [key in MethodType]?: IApi;
} & { path: string };

export interface IApi {
    tags: string[];
    summary: string;
    parameters?: IParameter[];
    responses?: IResponse;
}

export interface IParameter {
    in: string;
    name: string;
    description: string;
    required: boolean;
    schema: ISchema;
}

export type IResponse = {
    [key in number]?: IStatus;
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
}

export type PrimitiveTypes = 'number' | 'integer' | 'boolean' | 'array' | 'object' | 'string';

export type MethodType = 'get' | 'post' | 'head' | 'put' | 'delete' | 'options';
