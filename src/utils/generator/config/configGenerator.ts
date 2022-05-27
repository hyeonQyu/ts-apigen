import { Config } from '../../../defines/config';

const fs = require('fs');

export namespace ConfigGenerator {
    export function generateConfig(config: Config) {
        const jsonConfig = JSON.stringify(config);

        try {
            fs.writeFileSync(`${process.cwd()}/tsapigen.config.json`, jsonConfig);
            console.log(config, '저장 성공');
        } catch (e) {
            console.error(e);
            throw new Error(`${jsonConfig} 저장 중 오류가 발생했습니다.`);
        }
    }
}
