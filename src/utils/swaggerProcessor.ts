import { SwaggerJson } from '../defines/SwaggerJson';
const { getByFileInfoByName } = require('./file/fileParser');
const { getControllerInfoByController } = require('./controller/controllerParser');

module.exports = {
    generateCode(swaggerJson: SwaggerJson) {
        const { paths, definitions } = swaggerJson;
        const objectByName = getByFileInfoByName(definitions);
        const controllerInfoByController = getControllerInfoByController(paths);
        console.log(controllerInfoByController);
    },
};
