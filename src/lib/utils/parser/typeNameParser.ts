import { ISchema } from '../../defines/openApi';

export namespace TypeNameParser {
    /**
     * 스키마로부터 타입 이름을 반환
     * @param schema
     * @param refSet 집합 인자로 전달하는 경우 해당 타입에서 사용하는 다른 타입의 이름을 집합에 넣음
     */
    export function getTypeNameFromSchema(schema: ISchema, refSet?: Set<string>): string {
        if (schema?.type) {
            return getTypeNameFromPrimitiveType(schema, refSet);
        }
        return getTypeNameFromRef(schema, refSet);
    }

    function getTypeNameFromRef(schema: ISchema, refSet?: Set<string>): string {
        const typeName = schema.$ref?.substring('#/definitions/'.length);

        if (typeName) {
            refSet?.add(typeName);
            return typeName;
        }
        return 'any';
    }

    function getTypeNameFromPrimitiveType(schema: ISchema, refSet?: Set<string>): string {
        const { type } = schema;

        if (type === 'number' || type === 'integer') {
            return 'number';
        }

        if (type === 'array') {
            const { items } = schema;
            return items ? `${getTypeNameFromSchema(items, refSet)}[]` : 'any[]';
        }

        if (type === 'string' && schema?.enum) {
            return `\'${schema.enum.join("' | '")}\'`;
        }

        return type ?? 'any';
    }
}
