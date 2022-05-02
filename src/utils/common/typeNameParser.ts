import { ISchema } from '../../defines/SwaggerJson';

const getTypeNameFromRef = (schema: ISchema, refs?: string[]): string => {
    const typeName = schema.$ref?.substring('#/definitions/'.length);

    if (typeName) {
        refs?.push(typeName);
        return typeName;
    }
    return 'any';
};

const getTypeNameFromPrimitiveType = (schema: ISchema, refs?: string[]): string => {
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

/**
 * 스키마로부터 타입 이름을 반환
 * @param schema
 * @param refs 배열을 인자로 전달하는 경우 해당 타입에서 사용하는 다른 타입의 이름을 배열에 넣음
 */
const getTypeNameFromSchema = (schema: ISchema, refs?: string[]): string => {
    if (schema?.type) {
        return getTypeNameFromPrimitiveType(schema, refs);
    }
    return getTypeNameFromRef(schema, refs);
};

module.exports = {
    getTypeNameFromSchema,
};
