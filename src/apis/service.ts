import { OpenApi } from '../defines/openApi';
import axios from 'axios';
import { ApigenConfig } from '../config/apigenConfig';
import { ControllersReq, ControllersRes, GenerateReq, SaveReq } from '../defines/models';
import { SwaggerProcessor } from '../utils/swaggerProcessor';
import { ConfigGenerator } from '../utils/generator/config/configGenerator';
import { Config } from '../defines/config';

export namespace Service {
    let openApiData: OpenApi;

    export async function getControllers(req: ControllersReq, path: string = '/controllers'): Promise<ControllersRes> {
        const { apiDocsUri } = req;

        ApigenConfig.setApiDocsUri(apiDocsUri);

        try {
            openApiData = await getOpenApiData();
            const { tags } = openApiData;
            return { controllerNames: ApigenConfig.tagsToControllerNames(tags), status: 200 };
        } catch (e) {
            console.error(path, e);
            return { controllerNames: [], status: 500 };
        }
    }

    export async function postGenerate(req: GenerateReq): Promise<number> {
        const { config } = req;

        ApigenConfig.setConfig(config);

        try {
            openApiData = await getOpenApiData();
            SwaggerProcessor.generateCode(openApiData);
            return 200;
        } catch (e) {
            console.error('/generate', e);
            return 500;
        }
    }

    export async function postSave(req: SaveReq): Promise<number> {
        const { config } = req;

        try {
            ConfigGenerator.generateConfig(config);
            return 200;
        } catch (e) {
            console.error('/save', e);
            return 500;
        }
    }

    export function getConfig(): Config {
        return ConfigGenerator.readConfig();
    }

    async function getOpenApiData(): Promise<OpenApi> {
        return (await axios.get(ApigenConfig.config.apiDocsUri)).data;
    }
}
