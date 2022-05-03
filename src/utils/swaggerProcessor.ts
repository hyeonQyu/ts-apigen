import { SwaggerJson } from '../defines/SwaggerJson';
const { getByFileInfoByName } = require('./file/fileParser');
const { getControllerInfoByController } = require('./controller/controllerParser');

module.exports = {
    generateCode(swaggerJson: SwaggerJson) {
        const { paths, definitions } = swaggerJson;
        console.log('definitions', definitions);
        console.log('paths', paths);

        const fileInfoByName = getByFileInfoByName(definitions);
        const controllerInfoByController = getControllerInfoByController(paths);

        console.log(fileInfoByName);
        console.log(controllerInfoByController);
    },
};
