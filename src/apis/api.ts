import { ApigenConfig } from '../config/apigenConfig';
import { SwaggerProcessor } from '../utils/swaggerProcessor';
import { OpenApi } from '../defines/openApi';
import axios from 'axios';
import { ParamsDictionary, Request, Response } from 'express-serve-static-core';
import { ControllersReq, ControllersRes } from '../defines/models';
import { ParsedQs } from 'qs';

export namespace Api {
    let openApiData: OpenApi;

    export async function request() {
        try {
            openApiData = (await axios.get(ApigenConfig.config.apiDocsUri)).data;

            SwaggerProcessor.generateCode(openApiData);
        } catch (e) {
            console.error('에러', e);
        }
    }

    export async function response(app: any) {
        /**
         * 컨트롤러 목록 반환
         */
        doCommonResponse<ControllersReq, ControllersRes>(app, 'controllers', 'get', async (req, res) => {
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
        doCommonResponse(app, 'generate', 'post', async (req, res) => {});
    }

    async function getOpenApiData(): Promise<OpenApi> {
        return (await axios.get(ApigenConfig.config.apiDocsUri)).data;
    }

    function doCommonResponse<Req extends ParsedQs, Res>(
        app: any,
        path: string,
        method: 'get' | 'post',
        callback: (req: Request<ParamsDictionary, any, any, Req>, res: Response<Res>) => void,
    ) {
        app[method](`/api/${path}`, async (req: Request<ParamsDictionary, any, any, Req>, res: Response<Res>) => {
            console.log(`\nrequest: /${path}`);
            await callback(req, res);
        });
    }
}
