import { ModelInfo } from '../../../defines/modelInfo';
import { ApigenConfig } from '../../../config/apigenConfig';
import { ImportGenerator } from '../import/importGenerator';
import { CaseStyleFormatter } from '../../string/caseStyleFormatter';

const prettier = require('prettier');
const fs = require('fs');

export namespace ModelGenerator {
    export function generateModels(modelInfoByName: Map<string, ModelInfo>) {
        const { generatedCodePath, prettierConfig } = ApigenConfig.config;

        const directoryPath = `${generatedCodePath}/models`;

        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath);
        }

        modelInfoByName.forEach((fileInfo, name) => {
            const { refSet, typeInfo } = fileInfo;

            const innerContentList: string[] = Object.entries(typeInfo).map(([propName, propType]) => `${propName}: ${propType};\n`);

            const ts = `
                ${ImportGenerator.getImportCode(refSet)}
                export interface ${name} {
                    ${innerContentList.join('')}
                }
            `;

            fs.writeFileSync(`${directoryPath}/${CaseStyleFormatter.pascalCaseToCamelCase(name)}.ts`, prettier.format(ts, prettierConfig));
        });
    }

    function getDirectoryPath() {
        const { config, openApiVersion } = ApigenConfig;
        const { generatedCodePath } = config;

        switch (openApiVersion) {
            // 3.0
            case 3:
                return;

            // 2.0
            case 2:
            default:
                return `${generatedCodePath}/models`;
        }
    }
}
