import { OpenApi } from '../defines/openApi';
import { ModelParser } from './parser/modelParser';
import { ControllerParser } from './parser/controllerParser';
import { ModelGenerator } from './generator/model/modelGenerator';
import { RequestGenerator } from './generator/request/requestGenerator';
import { ApigenConfig } from '../config/apigenConfig';
const fs = require('fs');

export namespace SwaggerProcessor {
    export function generateCode(swaggerJson: OpenApi) {
        const { paths, definitions, tags } = swaggerJson;
        ApigenConfig.setControllerNames(tags);

        console.log('----------------------------------Swagger row 데이터----------------------------------');
        console.log('definitions', definitions);
        console.log('paths', paths);
        console.log('tags', tags);

        const fileInfoByName = ModelParser.getByModelInfoByName(definitions);
        const controllerInfoByController = ControllerParser.getControllerInfoByController(paths);

        console.log('-------------------------------------가공 후 데이터------------------------------------');
        console.log(fileInfoByName);
        console.log(controllerInfoByController);

        const { generatedCodePath } = ApigenConfig.config;
        if (!fs.existsSync(generatedCodePath)) {
            fs.mkdirSync(generatedCodePath);
        }

        ModelGenerator.generateModels(fileInfoByName);
        RequestGenerator.generateRequests(controllerInfoByController);
    }
}
