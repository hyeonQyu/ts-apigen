import { IDefinitions } from '../../defines/SwaggerJson';
import { FileInfo, TypeInfo } from '../../defines/FileInfo';
const { getTypeNameFromSchema } = require('../common/typeNameParser');

const getByFileInfoByName = (definitions: IDefinitions): Map<string, FileInfo> => {
    const fileInfoByName = new Map<string, FileInfo>();

    Object.entries(definitions).forEach(([name, objectInfo]) => {
        const { properties } = objectInfo;
        const typeInfo: TypeInfo = {};
        const refSet = new Set<string>();

        Object.entries(properties).forEach(([property, schema]) => {
            typeInfo[property] = getTypeNameFromSchema(schema, refSet);
        });
        fileInfoByName.set(name, { refSet, typeInfo });
    });

    return fileInfoByName;
};

module.exports = {
    getByFileInfoByName,
};
