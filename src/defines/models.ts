import { ParsedQs } from 'qs';
import { Config } from './config';

export interface ControllersReq extends ParsedQs {
    apiDocsUri: string;
}

export interface ControllersRes extends CommonRes {
    controllerNames: string[];
}

export interface GenerateReq {
    config: Config;
}

export interface SaveReq {
    config: Config;
}

export interface ConfigRes extends CommonRes {
    config: Config;
    controllerNamesByUri: string[];
}

export interface CommonRes {
    status: number;
}
