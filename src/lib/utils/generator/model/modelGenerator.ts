import { ModelInfo } from '../../../defines/modelInfo';
import { ApigenConfig } from '../../../config/apigenConfig';
import { PrettierParser } from '../../parser/prettierParser';
import { ImportGenerator } from '../import/importGenerator';

const prettier = require('prettier');
const fs = require('fs');

export namespace ModelGenerator {
    export function generateModels(modelInfoByName: Map<string, ModelInfo>) {
        const directoryPath = `${ApigenConfig.config.generatedCodePath}/models`;

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

            fs.writeFileSync(`${directoryPath}/${name}.ts`, prettier.format(ts, PrettierParser.prettierConfig));
        });
    }
}