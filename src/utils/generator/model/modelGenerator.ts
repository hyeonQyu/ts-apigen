import { ModelInfo } from '../../../defines/ModelInfo';
const prettier = require('prettier');
const fs = require('fs');

const generateModels = (modelInfoByName: Map<string, ModelInfo>) => {
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

        fs.writeFileSync(
            `./api-src/models/${name}.ts`,
            prettier.format(ts, {
                trailingComma: 'all',
                tabWidth: 4,
                semi: true,
                singleQuote: true,
                printWidth: 140,
            }),
        );
    });
};

module.exports = {
    generateModels,
};
