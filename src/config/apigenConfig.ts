import { Config } from '../defines/config';
import { ITag } from '../defines/openApi';
import { ReqConfig } from '../defines/models';

export namespace ApigenConfig {
    export const config: Config = {
        apiDocsUri: 'http://localhost:8080/v2/api-docs',
        generatedCodePath: './apis',
        requestApi: 'axios',
        // controllerList: ['ApigenController'],
    };

    export function setConfig(newConfig: ReqConfig) {
        const { apiDocsUri, prettierConfig, requestApi, controllerNames } = newConfig;
        config.apiDocsUri = apiDocsUri;
        config.prettierConfig = prettierConfig;
        config.requestApi = requestApi;
        config.controllerNames = controllerNames;
    }

    export function setApiDocsUri(apiDocsUri: string) {
        config.apiDocsUri = apiDocsUri;
    }

    export function setControllerNames(tags: ITag[]) {
        if (!config.controllerNames) {
            config.controllerNames = tagsToControllerNames(tags);
        }
    }

    export function tagsToControllerNames(tags: ITag[]): string[] {
        return tags.map(({ description }) => description.replace(/\s/g, ''));
    }
}
