import { ParsedQs } from 'qs';

export interface ControllersReq extends ParsedQs {
    docsUri: string;
}

export interface ControllersRes {
    controllerNames: string[];
}
