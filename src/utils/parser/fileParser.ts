import { IDefinitions } from '../../defines/SwaggerJson';
import { ModelInfo, TypeInfo } from '../../defines/ModelInfo';
const { getTypeNameFromSchema } = require('./typeNameParser');

const getByModelInfoByName = (definitions: IDefinitions): Map<string, ModelInfo> => {
    const modelInfoByName = new Map<string, ModelInfo>();

    Object.entries(definitions).forEach(([name, objectInfo]) => {
        const { properties } = objectInfo;
        const typeInfo: TypeInfo = {};
        const refSet = new Set<string>();

        Object.entries(properties).forEach(([property, schema]) => {
            typeInfo[property] = getTypeNameFromSchema(schema, refSet);
        });
        modelInfoByName.set(name, { refSet, typeInfo });
    });

    return modelInfoByName;
};

module.exports = {
    getByModelInfoByName,
};
