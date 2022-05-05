import { SwaggerJson } from '../defines/swaggerJson';
import { ModelParser } from './parser/modelParser';
import { ControllerParser } from './parser/controllerParser';
import { ModelGenerator } from './generator/model/modelGenerator';

export namespace SwaggerProcessor {
    export function generateCode(swaggerJson: SwaggerJson) {
        const { paths, definitions } = swaggerJson;
        console.log('----------------------------------Swagger row 데이터----------------------------------');
        console.log('definitions', definitions);
        console.log('paths', paths);

        const fileInfoByName = ModelParser.getByModelInfoByName(definitions);
        const controllerInfoByController = ControllerParser.getControllerInfoByController(paths);

        console.log('-------------------------------------가공 후 데이터------------------------------------');
        console.log(fileInfoByName);
        console.log(controllerInfoByController);

        ModelGenerator.generateModels(fileInfoByName);
    }
}
