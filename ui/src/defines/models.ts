import { ParsedQs } from 'qs';
import { Config } from '@defines/config';

export interface ControllersReq extends ParsedQs {
    docsUri: string;
}

export interface ControllersRes {
    controllerNames: string[];
}

export interface GenerateCodeReq {
    config: Omit<Config, 'generatedCodePath'>;
}
