import { Config } from '../../../defines/config';
import { ApigenConfig } from '../../../config/apigenConfig';

const fs = require('fs');

export namespace ConfigGenerator {
    const configFilePath = `${process.cwd()}/tsapigen.config.json`;

    /**
     * 설정 파일 생성
     * @param config
     */
    export function generateConfig(config: Config) {
        const jsonConfig = JSON.stringify(config);

        try {
            fs.writeFileSync(configFilePath, jsonConfig);
            console.log(config, '저장 성공');
        } catch (e) {
            console.error(e);
            throw new Error(`${jsonConfig} 저장 중 오류가 발생했습니다.`);
        }
    }

    /**
     * 설정 파일 읽기
     */
    export function readConfig(): Config {
        try {
            const jsonFile = fs.readFileSync(configFilePath, 'utf-8');
            const config: Config = JSON.parse(jsonFile);
            return config;
        } catch (e) {
            console.error(e);
            return ApigenConfig.config;
        }
    }
}
