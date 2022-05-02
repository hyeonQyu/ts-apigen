import { IDefinitions, IPaths, IRestApi, ISchema, PrimitiveTypes, SwaggerJson } from '../defines/SwaggerJson';
import { FileInfo, ITypeInfo } from '../defines/FileInfo';

const getController = (restApi: Omit<IRestApi, 'path'>): string => Object.values(restApi)[0].tags[0];

const getTypeNameFromRef = (schema: ISchema, refs: string[]): string => {
    const typeName = schema.$ref?.substring('#/definitions/'.length);
    if (typeName) {
        refs.push(typeName);
        return typeName;
    }
    return 'any';
};

const getTypeNameFromPrimitiveType = (schema: ISchema, refs: string[]): string => {
    const { type } = schema;

    if (type === 'number' || type === 'integer') {
        return 'number';
    }

    if (type === 'array') {
        const { items } = schema;
        return items ? `${getTypeNameFromSchema(items, refs)}[]` : 'any[]';
    }

    return type ?? 'any';
};

const getTypeNameFromSchema = (schema: ISchema, refs: string[]): string => {
    if (schema?.type) {
        return getTypeNameFromPrimitiveType(schema, refs);
    }
    return getTypeNameFromRef(schema, refs);
};

// 컨트롤러마다 API 정보 리스트를 가짐
const getRestApiByController = (paths: IPaths): Map<string, IRestApi[]> => {
    const restApiByController = new Map<string, IRestApi[]>();

    Object.entries(paths).forEach(([path, restApi]) => {
        const controller: string = getController(restApi);

        const apis: IRestApi[] | undefined = restApiByController.get(controller);
        const newApi: IRestApi = { ...restApi, path };

        if (apis) {
            restApiByController.set(controller, [...apis, newApi]);
            return;
        }
        restApiByController.set(controller, [newApi]);
    });

    return restApiByController;
};

// 파일 이름 별 파일 정보
const getByFileInfoByName = (definitions: IDefinitions): Map<string, FileInfo> => {
    const fileInfoByName = new Map<string, FileInfo>();

    Object.entries(definitions).forEach(([name, objectInfo]) => {
        const { properties } = objectInfo;
        const typeInfo: ITypeInfo = {};
        const refs: string[] = [];

        Object.entries(properties).forEach(([property, schema]) => {
            typeInfo[property] = getTypeNameFromSchema(schema, refs);
        });
        fileInfoByName.set(name, { refs, typeInfo });
    });

    return fileInfoByName;
};

module.exports = {
    generateCode(swaggerJson: SwaggerJson) {
        const { paths, definitions } = swaggerJson;
        const restApiByController = getRestApiByController(paths);
        const objectByName = getByFileInfoByName(definitions);
        console.log(objectByName);
    },
};
