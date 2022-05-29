import { ParamsDictionary, Request, Response } from 'express-serve-static-core';
import { CommonRes, ConfigRes, ControllersReq, ControllersRes, GenerateReq, SaveReq } from '../defines/models';
import { ParsedQs } from 'qs';
import { Service } from './service';

export namespace Controller {
    export async function response(app: any) {
        /**
         * 컨트롤러 목록 반환
         */
        doCommonResponse<any, ControllersReq, ControllersRes>(app, 'controllers', 'get', async (req, res) => {
            const response = await Service.getControllers(req.query);
            res.status(response.status).send(response);
        });

        /**
         * 코드 생성
         */
        doCommonResponse<GenerateReq, any, void>(app, 'generate', 'post', async (req, res) => {
            const status = await Service.postGenerate(req.body);
            res.status(status).send();
        });

        /**
         * 설정 저장
         */
        doCommonResponse<SaveReq, any, void>(app, 'save', 'post', async (req, res) => {
            const status = await Service.postSave(req.body);
            res.status(status).send();
        });

        doCommonResponse<any, any, ConfigRes>(app, 'config', 'get', async (req, res) => {
            const config = Service.getConfig();
            const { apiDocsUri } = config;
            const { controllerNames } = await Service.getControllers({ apiDocsUri }, '/config');
            res.send({ controllerNamesByUri: controllerNames, config });
        });
    }

    function doCommonResponse<ReqBody, ReqQs extends ParsedQs, Res extends CommonRes | void>(
        app: any,
        path: string,
        method: 'get' | 'post',
        callback: (req: Request<ParamsDictionary, any, ReqBody, ReqQs>, res: Response<Omit<Res, 'status'>>) => void,
    ) {
        app[method](`/api/${path}`, async (req: Request<ParamsDictionary, any, ReqBody, ReqQs>, res: Response<Omit<Res, 'status'>>) => {
            console.log(`\nrequest: /${path}`);
            await callback(req, res);
        });
    }
}
