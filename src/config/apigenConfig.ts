import { Config } from '../defines/config';
import { ITag } from '../defines/openApi';
import { ReqConfig } from '../defines/models';

export namespace ApigenConfig {
    export let config: Config = {
        apiDocsUri: 'http://localhost:8080/v2/api-docs',
        generatedCodePath: './apis',
        requestApi: 'axios',
    };

    export function setConfig(newConfig: ReqConfig) {
        config = {
            ...config,
            ...newConfig,
        };
    }

    export function setApiDocsUri(apiDocsUri: string) {
        config.apiDocsUri = apiDocsUri;
    }

    export function setControllerNames(tags: ITag[]) {
        if (!config.controllerNames || config.controllerNames.length === 0) {
            config.controllerNames = tagsToControllerNames(tags);
        }
    }

    export function tagsToControllerNames(tags: ITag[]): string[] {
        return tags.map(({ description }) => description.replace(/\s/g, ''));
    }
}
