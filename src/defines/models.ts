import { ParsedQs } from 'qs';
import { Config } from './config';

export interface ControllersReq extends ParsedQs {
    apiDocsUri: string;
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

export interface ConfigRes {
    config: Config;
}
