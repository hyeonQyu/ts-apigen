import { OpenApi } from '../defines/openApi';
import { ModelParser } from './parser/modelParser';
import { ControllerParser } from './parser/controllerParser';
import { ModelGenerator } from './generator/model/modelGenerator';
import { RequestGenerator } from './generator/request/requestGenerator';
import { ApigenConfig } from '../config/apigenConfig';
const fs = require('fs');

export namespace SwaggerProcessor {
    export function generateCode(swaggerJson: OpenApi) {
        swaggerJson = {
            openapi: '3.0.3',
            info: { title: 'RPM_SSO_AUTH', description: 'Rpm Sso Auth API 명세서', version: '0.0.1' },
            servers: [{ url: 'http://localhost:9000', description: 'Inferred Url' }],
            tags: [
                { name: 'basic-error-controller', description: 'Basic Error Controller' },
                { name: '사용자 인증 컨트롤러', description: 'User Auth Controller' },
            ],
            paths: {
                '/error': {
                    get: {
                        tags: ['basic-error-controller'],
                        summary: 'errorHtml',
                        operationId: 'errorHtmlUsingGET',
                        responses: {
                            '200': {
                                description: 'OK',
                                content: { 'text/html': { schema: { $ref: '#/components/schemas/ModelAndView' } } },
                            },
                            '401': { description: 'Unauthorized' },
                            '403': { description: 'Forbidden' },
                            '404': { description: 'Not Found' },
                        },
                    },
                    put: {
                        tags: ['basic-error-controller'],
                        summary: 'errorHtml',
                        operationId: 'errorHtmlUsingPUT',
                        responses: {
                            '200': {
                                description: 'OK',
                                content: { 'text/html': { schema: { $ref: '#/components/schemas/ModelAndView' } } },
                            },
                            '201': { description: 'Created' },
                            '401': { description: 'Unauthorized' },
                            '403': { description: 'Forbidden' },
                            '404': { description: 'Not Found' },
                        },
                    },
                    post: {
                        tags: ['basic-error-controller'],
                        summary: 'errorHtml',
                        operationId: 'errorHtmlUsingPOST',
                        responses: {
                            '200': {
                                description: 'OK',
                                content: { 'text/html': { schema: { $ref: '#/components/schemas/ModelAndView' } } },
                            },
                            '201': { description: 'Created' },
                            '401': { description: 'Unauthorized' },
                            '403': { description: 'Forbidden' },
                            '404': { description: 'Not Found' },
                        },
                    },
                    delete: {
                        tags: ['basic-error-controller'],
                        summary: 'errorHtml',
                        operationId: 'errorHtmlUsingDELETE',
                        responses: {
                            '200': {
                                description: 'OK',
                                content: { 'text/html': { schema: { $ref: '#/components/schemas/ModelAndView' } } },
                            },
                            '204': { description: 'No Content' },
                            '401': { description: 'Unauthorized' },
                            '403': { description: 'Forbidden' },
                        },
                    },
                    options: {
                        tags: ['basic-error-controller'],
                        summary: 'errorHtml',
                        operationId: 'errorHtmlUsingOPTIONS',
                        responses: {
                            '200': {
                                description: 'OK',
                                content: { 'text/html': { schema: { $ref: '#/components/schemas/ModelAndView' } } },
                            },
                            '204': { description: 'No Content' },
                            '401': { description: 'Unauthorized' },
                            '403': { description: 'Forbidden' },
                        },
                    },
                    head: {
                        tags: ['basic-error-controller'],
                        summary: 'errorHtml',
                        operationId: 'errorHtmlUsingHEAD',
                        responses: {
                            '200': {
                                description: 'OK',
                                content: { 'text/html': { schema: { $ref: '#/components/schemas/ModelAndView' } } },
                            },
                            '204': { description: 'No Content' },
                            '401': { description: 'Unauthorized' },
                            '403': { description: 'Forbidden' },
                        },
                    },
                    patch: {
                        tags: ['basic-error-controller'],
                        summary: 'errorHtml',
                        operationId: 'errorHtmlUsingPATCH',
                        responses: {
                            '200': {
                                description: 'OK',
                                content: { 'text/html': { schema: { $ref: '#/components/schemas/ModelAndView' } } },
                            },
                            '204': { description: 'No Content' },
                            '401': { description: 'Unauthorized' },
                            '403': { description: 'Forbidden' },
                        },
                    },
                    trace: {
                        tags: ['basic-error-controller'],
                        summary: 'errorHtml',
                        operationId: 'errorHtmlUsingTRACE',
                        responses: {
                            '200': {
                                description: 'OK',
                                content: { 'text/html': { schema: { $ref: '#/components/schemas/ModelAndView' } } },
                            },
                            '204': { description: 'No Content' },
                            '401': { description: 'Unauthorized' },
                            '403': { description: 'Forbidden' },
                        },
                    },
                },
                '/login': {
                    post: {
                        tags: ['사용자 인증 컨트롤러'],
                        summary: '사용자 로그인 토큰 발급',
                        operationId: 'loginUsingPOST_1',
                        requestBody: { content: { 'application/json': { schema: { $ref: '#/components/schemas/LoginVO' } } } },
                        responses: {
                            '200': {
                                description: 'OK',
                                content: { '*/*': { schema: { $ref: '#/components/schemas/JwtTokenDto' } } },
                            },
                            '201': { description: 'Created' },
                            '401': { description: 'Unauthorized' },
                            '403': { description: 'Forbidden' },
                            '404': { description: 'Not Found' },
                        },
                    },
                },
                '/logout': {
                    post: {
                        tags: ['사용자 인증 컨트롤러'],
                        summary: '사용자 로그아웃',
                        operationId: 'logoutUsingPOST',
                        parameters: [
                            { name: 'authenticated', in: 'query', required: false, style: 'form', schema: { type: 'boolean' } },
                            { name: 'authorities[0].authority', in: 'query', required: false, style: 'form', schema: { type: 'string' } },
                            { name: 'credentials', in: 'query', required: false, style: 'form', schema: { type: 'object' } },
                            { name: 'details', in: 'query', required: false, style: 'form', schema: { type: 'object' } },
                            { name: 'principal', in: 'query', required: false, style: 'form', schema: { type: 'object' } },
                        ],
                        responses: {
                            '200': { description: 'OK', content: { '*/*': { schema: { type: 'boolean' } } } },
                            '201': { description: 'Created' },
                            '401': { description: 'Unauthorized' },
                            '403': { description: 'Forbidden' },
                            '404': { description: 'Not Found' },
                        },
                    },
                },
                '/refresh-token': {
                    post: {
                        tags: ['사용자 인증 컨트롤러'],
                        summary: '사용자 토큰 재사용 요청',
                        operationId: 'loginUsingPOST',
                        requestBody: { content: { 'application/json': { schema: { $ref: '#/components/schemas/JwtTokenDto' } } } },
                        responses: {
                            '200': {
                                description: 'OK',
                                content: { '*/*': { schema: { $ref: '#/components/schemas/JwtTokenDto' } } },
                            },
                            '201': { description: 'Created' },
                            '401': { description: 'Unauthorized' },
                            '403': { description: 'Forbidden' },
                            '404': { description: 'Not Found' },
                        },
                    },
                },
                '/user/me': {
                    get: {
                        tags: ['사용자 인증 컨트롤러'],
                        summary: '사용자 정보 조회',
                        operationId: 'userUsingGET',
                        parameters: [{ name: 'name', in: 'query', required: false, style: 'form', schema: { type: 'string' } }],
                        responses: {
                            '200': { description: 'OK', content: { '*/*': { schema: { $ref: '#/components/schemas/Principal' } } } },
                            '401': { description: 'Unauthorized' },
                            '403': { description: 'Forbidden' },
                            '404': { description: 'Not Found' },
                        },
                    },
                },
            },
            components: {
                schemas: {
                    JwtTokenDto: {
                        title: 'JwtTokenDto',
                        required: ['refreshToken', 'token'],
                        type: 'object',
                        properties: {
                            refreshToken: { type: 'string', description: '재사용 토큰' },
                            token: { type: 'string', description: '인증 토큰' },
                        },
                    },
                    ModelAndView: {
                        title: 'ModelAndView',
                        type: 'object',
                        properties: {
                            empty: { type: 'boolean' },
                            model: { type: 'object' },
                            modelMap: { type: 'object' },
                            reference: { type: 'boolean' },
                            status: {
                                type: 'string',
                                enum: [
                                    'ACCEPTED',
                                    'ALREADY_REPORTED',
                                    'BAD_GATEWAY',
                                    'BAD_REQUEST',
                                    'BANDWIDTH_LIMIT_EXCEEDED',
                                    'CHECKPOINT',
                                    'CONFLICT',
                                    'CONTINUE',
                                    'CREATED',
                                    'DESTINATION_LOCKED',
                                    'EXPECTATION_FAILED',
                                    'FAILED_DEPENDENCY',
                                    'FORBIDDEN',
                                    'FOUND',
                                    'GATEWAY_TIMEOUT',
                                    'GONE',
                                    'HTTP_VERSION_NOT_SUPPORTED',
                                    'IM_USED',
                                    'INSUFFICIENT_SPACE_ON_RESOURCE',
                                    'INSUFFICIENT_STORAGE',
                                    'INTERNAL_SERVER_ERROR',
                                    'I_AM_A_TEAPOT',
                                    'LENGTH_REQUIRED',
                                    'LOCKED',
                                    'LOOP_DETECTED',
                                    'METHOD_FAILURE',
                                    'METHOD_NOT_ALLOWED',
                                    'MOVED_PERMANENTLY',
                                    'MOVED_TEMPORARILY',
                                    'MULTIPLE_CHOICES',
                                    'MULTI_STATUS',
                                    'NETWORK_AUTHENTICATION_REQUIRED',
                                    'NON_AUTHORITATIVE_INFORMATION',
                                    'NOT_ACCEPTABLE',
                                    'NOT_EXTENDED',
                                    'NOT_FOUND',
                                    'NOT_IMPLEMENTED',
                                    'NOT_MODIFIED',
                                    'NO_CONTENT',
                                    'OK',
                                    'PARTIAL_CONTENT',
                                    'PAYLOAD_TOO_LARGE',
                                    'PAYMENT_REQUIRED',
                                    'PERMANENT_REDIRECT',
                                    'PRECONDITION_FAILED',
                                    'PRECONDITION_REQUIRED',
                                    'PROCESSING',
                                    'PROXY_AUTHENTICATION_REQUIRED',
                                    'REQUESTED_RANGE_NOT_SATISFIABLE',
                                    'REQUEST_ENTITY_TOO_LARGE',
                                    'REQUEST_HEADER_FIELDS_TOO_LARGE',
                                    'REQUEST_TIMEOUT',
                                    'REQUEST_URI_TOO_LONG',
                                    'RESET_CONTENT',
                                    'SEE_OTHER',
                                    'SERVICE_UNAVAILABLE',
                                    'SWITCHING_PROTOCOLS',
                                    'TEMPORARY_REDIRECT',
                                    'TOO_EARLY',
                                    'TOO_MANY_REQUESTS',
                                    'UNAUTHORIZED',
                                    'UNAVAILABLE_FOR_LEGAL_REASONS',
                                    'UNPROCESSABLE_ENTITY',
                                    'UNSUPPORTED_MEDIA_TYPE',
                                    'UPGRADE_REQUIRED',
                                    'URI_TOO_LONG',
                                    'USE_PROXY',
                                    'VARIANT_ALSO_NEGOTIATES',
                                ],
                            },
                            view: { $ref: '#/components/schemas/View' },
                            viewName: { type: 'string' },
                        },
                    },
                    Principal: { title: 'Principal', type: 'object', properties: { name: { type: 'string' } } },
                    View: { title: 'View', type: 'object', properties: { contentType: { type: 'string' } } },
                    LoginVO: {
                        title: 'LoginVO',
                        required: ['userId', 'userPw'],
                        type: 'object',
                        properties: {
                            userId: { type: 'string', description: '사용자 아이디' },
                            userPw: { type: 'string', description: '사용자 고유 코드' },
                        },
                    },
                },
            },
        };
        setOpenApiVersion(swaggerJson);
        console.log('OpenAPI 버전', ApigenConfig.openApiVersion);

        const { paths, definitions = undefined, components = undefined, tags } = swaggerJson;
        ApigenConfig.setControllerNames(tags);

        console.log('----------------------------------Swagger row 데이터----------------------------------');
        console.log('definitions', definitions);
        console.log('components', components);
        console.log('paths', paths);
        console.log('tags', tags);

        const fileInfoByName = ModelParser.getModelInfoByName(swaggerJson);
        const controllerInfoByController = ControllerParser.getControllerInfoByController(tags, paths);

        console.log('-------------------------------------가공 후 데이터------------------------------------');
        console.log('Models', fileInfoByName);
        console.log('Requests', controllerInfoByController);

        const { generatedCodePath } = ApigenConfig.config;
        if (!fs.existsSync(generatedCodePath)) {
            fs.mkdirSync(generatedCodePath);
        }

        ModelGenerator.generateModels(fileInfoByName);
        RequestGenerator.generateRequests(controllerInfoByController);
    }

    function setOpenApiVersion(swaggerJson: OpenApi) {
        ApigenConfig.openApiVersion = Number((swaggerJson?.swagger ?? swaggerJson?.openapi ?? '2.0').charAt(0));
    }
}
