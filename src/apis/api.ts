import { ApigenConfig } from '../config/apigenConfig';
import { SwaggerProcessor } from '../utils/swaggerProcessor';
import { OpenApi } from '../defines/openApi';
import axios from 'axios';
import { ParamsDictionary, Request, Response } from 'express-serve-static-core';
import { ConfigRes, ControllersReq, ControllersRes, GenerateReq, SaveReq } from '../defines/models';
import { ParsedQs } from 'qs';
import { ConfigGenerator } from '../utils/generator/config/configGenerator';
import { Config } from '../defines/config';

export namespace Api {
    let openApiData: OpenApi;

    export async function response(app: any) {
        /**
         * 컨트롤러 목록 반환
         */
        doCommonResponse<any, ControllersReq, ControllersRes>(app, 'controllers', 'get', async (req, res) => {
            const { docsUri } = req.query;

            ApigenConfig.setApiDocsUri(docsUri);

            try {
                openApiData = await getOpenApiData();
                const { tags } = openApiData;
                res.send({ controllerNames: ApigenConfig.tagsToControllerNames(tags) });
            } catch (e) {
                console.error('/controllers', e);
                res.status(500).send({ controllerNames: [] });
            }
        });

        /**
         * 코드 생성
         */
        doCommonResponse<GenerateReq, any, boolean>(app, 'generate', 'post', async (req, res) => {
            const { config } = req.body;

            ApigenConfig.setConfig(config);

            try {
                openApiData = await getOpenApiData();
                SwaggerProcessor.generateCode(openApiData);
                res.send(true);
            } catch (e) {
                console.error('/generate', e);
                res.status(500).send(false);
            }
        });

        /**
         * 설정 저장
         */
        doCommonResponse<SaveReq, any, boolean>(app, 'save', 'post', async (req, res) => {
            const { config } = req.body;

            try {
                ConfigGenerator.generateConfig(config);
                res.send(true);
            } catch (e) {
                console.error('/save', e);
                res.status(500).send(false);
            }
        });

        doCommonResponse<any, any, ConfigRes>(app, 'config', 'get', async (req, res) => {
            const config: Config = ConfigGenerator.readConfig();
            res.send({ config });
        });
    }

    async function getOpenApiData(): Promise<OpenApi> {
        return (await axios.get(ApigenConfig.config.apiDocsUri)).data;
    }

    function doCommonResponse<ReqBody, ReqQs extends ParsedQs, Res>(
        app: any,
        path: string,
        method: 'get' | 'post',
        callback: (req: Request<ParamsDictionary, any, ReqBody, ReqQs>, res: Response<Res>) => void,
    ) {
        app[method](`/api/${path}`, async (req: Request<ParamsDictionary, any, ReqBody, ReqQs>, res: Response<Res>) => {
            console.log(`\nrequest: /${path}`);
            await callback(req, res);
        });
    }
}
