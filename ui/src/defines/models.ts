import { ParsedQs } from 'qs';
import { Config } from '@defines/config';

export interface ControllersReq extends ParsedQs {
    docsUri: string;
}

export interface ControllersRes {
    controllerNames: string[];
}

export interface GenerateReq {
    config: ReqConfig;
}

export interface ReqConfig extends Omit<Config, 'generatedCodePath'> {}
