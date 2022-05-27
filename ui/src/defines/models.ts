import { ParsedQs } from 'qs';
import { Config } from '@defines/config';

export interface ControllersReq extends ParsedQs {
    docsUri: string;
}

export interface ControllersRes {
    controllerNames: string[];
}

export interface GenerateReq {
    config: Config;
}

export interface SaveReq {
    config: Config;
}
