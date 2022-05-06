import { Config } from '../defines/config';
import { ITag } from '../defines/swaggerJson';

export namespace ApigenConfig {
    export const config: Config = {
        apiDocsUri: 'http://localhost:8080/v2/api-docs',
        generatedCodePath: './api-src',
        requestApi: 'axios',
        // controllerList: ['ApigenController'],
    };

    export function setControllerList(tags: ITag[]) {
        if (!config.controllerList) {
            config.controllerList = tags.map(({ description }) => description.replace(/\s/g, ''));
        }
    }
}
