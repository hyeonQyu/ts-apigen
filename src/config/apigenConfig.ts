import { Config } from '@defines/config';

export namespace ApigenConfig {
    export const config: Config = {
        apiDocsUri: 'http://localhost:8080/v2/api-docs',
        generatedModelsPath: './api-src/models',
        generatedRequestsPath: './api-src/requests',
        requestApi: 'fetch',
    };
}
