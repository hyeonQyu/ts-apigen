import { Config } from '../defines/config';
import { ITag } from '../defines/openApi';
import { StringFormatter } from '../utils/string/stringFormatter';

export namespace ApigenConfig {
    export let openApiVersion: number = 2;

    export let config: Config = {
        apiDocsUri: '',
        generatedCodePath: `${StringFormatter.getNormalizedPath(process.cwd())}/src/apis`,
        requestApi: 'axios',
        controllerNames: [],
        baseRootList: [],
        prettierConfigFileName: 'ℹ️ 기본 설정 적용중',
        prettierConfig: {
            trailingComma: 'all',
            tabWidth: 4,
            semi: true,
            singleQuote: true,
            printWidth: 140,
            parser: 'babel-ts',
        },
        selectedControllerType: 'INCLUDE',
    };

    export function setConfig(newConfig: Config) {
        config = {
            ...config,
            ...newConfig,
        };
        config.prettierConfig = {
            ...newConfig.prettierConfig,
            parser: 'babel-ts',
        };
        config.baseRootList.sort((root1, root2) => root2.length - root1.length);
    }

    export function setApiDocsUri(apiDocsUri: string) {
        config.apiDocsUri = apiDocsUri;
    }

    export function setControllerNames(tags: ITag[]) {
        const { controllerNames, selectedControllerType } = config;

        if (selectedControllerType === 'INCLUDE' && controllerNames.length === 0) {
            config.controllerNames = tagsToControllerNames(tags);
        }
    }

    export function tagsToControllerNames(tags: ITag[]): string[] {
        return tags.map(({ description }) => description.replace(/\s/g, ''));
    }
}
