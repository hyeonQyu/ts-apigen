import axios from 'axios';
import { ControllersReq, ControllersRes } from '@defines/models';

export namespace Api {
    const client = axios.create({ baseURL: 'http://localhost:6200/api' });

    /**
     * 컨트롤러 목록 요청
     * @param req
     */
    export async function getControllers(req: ControllersReq): Promise<ControllersRes> {
        return (await client.get('/controllers', { params: req })).data;
    }
}
