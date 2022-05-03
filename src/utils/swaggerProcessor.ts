import { SwaggerJson } from '../defines/SwaggerJson';
const { getByFileInfoByName } = require('./parser/fileParser');
const { getControllerInfoByController } = require('./parser/controllerParser');

module.exports = {
    generateCode(swaggerJson: SwaggerJson) {
        const { paths, definitions } = swaggerJson;
        console.log('----------------------------------Swagger row 데이터----------------------------------');
        console.log('definitions', definitions);
        console.log('paths', paths);

        const fileInfoByName = getByFileInfoByName(definitions);
        const controllerInfoByController = getControllerInfoByController(paths);

        console.log('-------------------------------------가공 후 데이터------------------------------------');
        console.log(fileInfoByName);
        console.log(controllerInfoByController);
    },
};
