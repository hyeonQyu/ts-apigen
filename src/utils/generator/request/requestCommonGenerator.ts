import { ApigenConfig } from '../../../config/apigenConfig';
import { PrettierParser } from '../../parser/prettierParser';

const prettier = require('prettier');
const fs = require('fs');

export namespace RequestCommonGenerator {
    export function generateCommonCode() {
        const directoryPath = `${ApigenConfig.config.generatedCodePath}/requests`;

        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath);
        }

        const ts = `
            ${getImportAxiosCode()}

            export namespace RequestCommon {
                ${getConfigCode()}
                
                ${getCreateFormDataCode()}
                
                ${getAxiosCode()}
            }
        `;

        fs.writeFileSync(`${directoryPath}/RequestCommon.ts`, prettier.format(ts, PrettierParser.prettierConfig));
    }

    function getImportAxiosCode(): string {
        return "import axios, { AxiosRequestConfig } from 'axios';";
    }

    function getCreateFormDataCode(): string {
        return `
            export function createFormData(data: object): FormData {
                const formData = new FormData();
        
                Object.entries(data).forEach(([key, value]) => {
                    if (value || value === false) {
                        if (Array.isArray(value)) {
                            formData.append(key, value.join());
                        } else if (value.constructor === File) {
                            formData.append(key, value);
                        } else {
                            formData.append(key, value.toString());
                        }
                    }
                });
                
                return formData;
            }
        `;
    }

    function getConfigCode(): string {
        return `
            ${getJsonConfigCode()}
            
            ${getFormDataConfigCode()}
            
            ${getJsonConfigFunctionCode()}
            
            ${getFormDataConfigFunctionCode()}
        `;
    }

    function getJsonConfigCode(): string {
        return `const jsonConfig = {
            ${getConfigHeaderCode('application/json')}
        }`;
    }

    function getFormDataConfigCode(): string {
        return `const formDataConfig = {
            ${getConfigHeaderCode('application/x-www-form-urlencoded')}
        }`;
    }

    function getJsonConfigFunctionCode(): string {
        return `export function getJsonConfig(config?: AxiosRequestConfig): AxiosRequestConfig {
            return {
                ...jsonConfig,
                ...config
            }
        }`;
    }

    function getFormDataConfigFunctionCode(): string {
        return `export function getFormDataConfig(config?: AxiosRequestConfig): AxiosRequestConfig {
            return {
                ...formDataConfig,
                ...config
            }
        }`;
    }

    function getConfigHeaderCode(contentType: string): string {
        return `
            headers: {
                'Content-Type': '${contentType}'
            }
        `;
    }

    function getAxiosCode(): string {
        return `
            export async function axiosGet<T>(url: string, params: object = {}, config?: AxiosRequestConfig) {
                return axios.get<T>(url, { params, ...config });
            }
    
            export async function axiosPost<T>(url: string, data: object = {}, config?: AxiosRequestConfig) {
                return await axios.post<T>(url, data, config);
            }
        `;
    }
}
