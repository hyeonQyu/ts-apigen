import { IDefinitions } from '../../defines/openApi';
import { ModelInfo, TypeInfo } from '../../defines/modelInfo';
import { TypeNameParser } from './typeNameParser';
import { CaseStyleFormatter } from '../string/caseStyleFormatter';

export namespace ModelParser {
    export function getByModelInfoByName(definitions: IDefinitions): Map<string, ModelInfo> {
        const modelInfoByName = new Map<string, ModelInfo>();

        Object.entries(definitions).forEach(([name, objectInfo]) => {
            const { properties } = objectInfo;
            const typeInfo: TypeInfo = {};
            const refSet = new Set<string>();

            Object.entries(properties).forEach(([property, schema]) => {
                typeInfo[property] = TypeNameParser.getTypeNameFromSchema(schema, refSet);
            });
            modelInfoByName.set(CaseStyleFormatter.genericToPascalCase(name), { refSet, typeInfo });
        });

        return modelInfoByName;
    }
}
