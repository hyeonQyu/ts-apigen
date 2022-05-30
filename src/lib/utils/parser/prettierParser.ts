import { ApigenConfig } from '../../config/apigenConfig';

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

        if (ApigenConfig.config?.prettierConfig) {
            try {
                return {
                    ...ApigenConfig.config.prettierConfig,
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
