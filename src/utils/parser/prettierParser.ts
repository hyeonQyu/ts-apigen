import { ApigenConfig } from '../../config/apigenConfig';

const fs = require('fs');

export namespace PrettierParser {
    export const prettierConfig = getPrettierConfig();

    function getPrettierConfig() {
        const defaultConfig = {
            trailingComma: 'all',
            tabWidth: 4,
            semi: true,
            singleQuote: true,
            printWidth: 140,
            parser: 'babel-ts',
        };

        if (ApigenConfig.config?.prettierrcPath) {
            try {
                return {
                    ...JSON.parse(fs.readFileSync(ApigenConfig.config.prettierrcPath, 'utf-8')),
                    parser: 'babel-ts',
                };
            } catch (e) {
                console.error('prettierrc path error:', e);
                return defaultConfig;
            }
        }

        return defaultConfig;
    }
}
