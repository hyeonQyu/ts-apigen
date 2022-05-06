import { ApigenConfig } from '../../../config/apigenConfig';
import { PrettierParser } from '../../parser/prettierParser';

const prettier = require('prettier');
const fs = require('fs');

export namespace RequestCommonGenerator {
    export function generateCommonCode() {
        const ts = `
            ${getImportAxiosCode()}
            
            export namespace RequestCommon {
                ${getCreateFormDataCode()}
                
                ${getAxiosCode()}
            }
        `;

        fs.writeFileSync(
            `${ApigenConfig.config.generatedCodePath}/requests/RequestCommon.ts`,
            prettier.format(ts, PrettierParser.prettierConfig),
        );
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
