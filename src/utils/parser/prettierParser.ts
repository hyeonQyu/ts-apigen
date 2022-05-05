import { ApigenConfig } from '@config/apigenConfig';

const fs = require('fs');

export namespace PrettierParser {
    export const prettierConfig = getPrettierConfig();

    const { prettierrcPath } = ApigenConfig.config;

    function getPrettierConfig() {
        const defaultConfig = {
            trailingComma: 'all',
            tabWidth: 4,
            semi: true,
            singleQuote: true,
            printWidth: 140,
        };

        if (prettierrcPath) {
            try {
                return JSON.parse(fs.readFileSync(prettierrcPath, 'utf-8'));
            } catch (e) {
                console.error('prettierrc path error:', e);
                return defaultConfig;
            }
        }

        return defaultConfig;
    }
}
