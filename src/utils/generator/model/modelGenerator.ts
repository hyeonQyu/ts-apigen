import { ModelInfo } from '@defines/modelInfo';
import { PrettierParser } from '@utils/parser/prettierParser';
import { ApigenConfig } from '@config/apigenConfig';

const prettier = require('prettier');
const fs = require('fs');

export namespace ModelGenerator {
    export function generateModels(modelInfoByName: Map<string, ModelInfo>) {
        modelInfoByName.forEach((fileInfo, name) => {
            const { refSet, typeInfo } = fileInfo;
            const refList = Array.from(refSet);

            const innerContentList: string[] = Object.entries(typeInfo).map(([propName, propType]) => `${propName}: ${propType};\n`);

            const ts = `
                ${refList?.map((ref) => `import { ${ref} } from \'./${ref}\';\n`).join('')}\n
                export interface ${name} {
                    ${innerContentList.join('')}
                }
            `;

            fs.writeFileSync(`${ApigenConfig.config.generatedModelsPath}/${name}.ts`, prettier.format(ts, PrettierParser.prettierConfig));
        });
    }
}
