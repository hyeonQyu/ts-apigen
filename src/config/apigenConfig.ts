import { Config } from '../defines/config';
import { ITag } from '../defines/openApi';

export namespace ApigenConfig {
    export let config: Config = {
        apiDocsUri: 'http://localhost:8080/v2/api-docs',
        generatedCodePath: `${process.cwd()}/apis`,
        requestApi: 'axios',
        controllerNames: [],
        baseRootList: [],
        prettierConfig: null,
        selectedControllerType: 'INCLUDE',
    };

    export function setConfig(newConfig: Config) {
        config = {
            ...config,
            ...newConfig,
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
