import axios from 'axios';
import { ControllersReq, ControllersRes, GenerateReq, SaveReq } from '@defines/models';

export namespace HomeApi {
    const client = axios.create({ baseURL: 'http://localhost:6200/api' });

    /**
     * 컨트롤러 목록 요청
     * @param req
     */
    export async function getControllers(req: ControllersReq): Promise<ControllersRes> {
        return (await client.get('/controllers', { params: req })).data;
    }

    /**
     * 코드 생성 요청
     * @param req
     */
    export async function postGenerate(req: GenerateReq): Promise<boolean> {
        return (await client.post('/generate', req)).data;
    }

    /**
     * 저장
     * @param req
     */
    export async function postSave(req: SaveReq): Promise<boolean> {
        return (await client.post('/save', req)).data;
    }
}
