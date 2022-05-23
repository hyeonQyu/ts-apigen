import { Config } from '../defines/config';
import { ITag } from '../defines/openApi';

export namespace ApigenConfig {
    export const config: Config = {
        apiDocsUri: 'http://localhost:8080/v2/api-docs',
        generatedCodePath: './apis',
        requestApi: 'axios',
        // controllerList: ['ApigenController'],
    };

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
