import { IComponents, IDefinitions, OpenApi } from '../../defines/openApi';
import { ModelInfo, TypeInfo } from '../../defines/modelInfo';
import { TypeNameParser } from './typeNameParser';
import { CaseStyleFormatter } from '../string/caseStyleFormatter';

export namespace ModelParser {
    export function getModelInfoByName(spec: OpenApi): Map<string, ModelInfo> {
        const { definitions = undefined, components = {} } = spec;

        // 2.0
        if (definitions) {
            return getModelInfoByNameSwagger2(definitions);
        }

        // 3.0
        return getModelInfoByNameOas3(components);
    }

    function getModelInfoByNameSwagger2(definitions: IDefinitions, type: string = ''): Map<string, ModelInfo> {
        const modelInfoByName = new Map<string, ModelInfo>();

        Object.entries(definitions).forEach(([name, objectInfo]) => {
            const { properties } = objectInfo;
            const typeInfo: TypeInfo = {};
            const refSet = new Set<string>();

            Object.entries(properties).forEach(([property, schema]) => {
                typeInfo[property] = TypeNameParser.getTypeNameFromSchema(schema, refSet);
            });
            modelInfoByName.set(`${type ? `${type}/` : ''}${CaseStyleFormatter.genericToPascalCase(name)}`, { refSet, typeInfo });
        });

        return modelInfoByName;
    }

    function getModelInfoByNameOas3(components: IComponents): Map<string, ModelInfo> {
        const mapList: Map<string, ModelInfo>[] = [];

        Object.entries(components).forEach(([type, definitions]) => {
            mapList.push(getModelInfoByNameSwagger2(definitions, type));
        });

        return new Map(
            mapList.reduce((acc: any[], map) => {
                return [...acc, ...map];
            }, []),
        );
    }
}
