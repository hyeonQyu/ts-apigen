import { ApigenConfig } from '../../../config/apigenConfig';

const prettier = require('prettier');
const fs = require('fs');

export namespace RequestCommonGenerator {
    export function generateCommonCode() {
        const { generatedCodePath, prettierConfig } = ApigenConfig.config;

        const directoryPath = `${generatedCodePath}/requests`;

        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath);
        }

        const ts = `
            ${getImportAxiosCode()}

            export namespace RequestCommon {
                const _axios = axios.create();
                
                ${getConfigCode()}
                
                ${getCreateFormDataCode()}
                
                ${getAxiosCode()}
            }
        `;

        fs.writeFileSync(`${directoryPath}/requestCommon.ts`, prettier.format(ts, prettierConfig));
    }

    function getImportAxiosCode(): string {
        return "import axios, { AxiosInterceptorOptions, AxiosRequestConfig } from 'axios';";
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
            export function setAxiosInterceptorsRequest<T>(
                onFulfilled?: (value: AxiosRequestConfig<any>) => T | Promise<T>,
                onRejected?: (error: any) => any,
                options?: AxiosInterceptorOptions,
            ) {
                _axios.interceptors.request.use(onFulfilled, onRejected, options);
            }
        
            export function setAxiosInterceptorsResponse<T>(
                onFulfilled?: (value: AxiosRequestConfig<any>) => T | Promise<T>,
                onRejected?: (error: any) => any,
                options?: AxiosInterceptorOptions,
            ) {
                _axios.interceptors.response.use(onFulfilled, onRejected, options);
            }

            export async function axiosGet<T>(url: string, params: object = {}, config?: AxiosRequestConfig) {
                return (await _axios.get<T>(url, { params, ...config })).data;
            }
    
            export async function axiosPost<T>(url: string, data: object = {}, config?: AxiosRequestConfig) {
                return (await _axios.post<T>(url, data, config)).data;
            }
            
            export async function axiosPut<T>(url: string, data: object = {}, config?: AxiosRequestConfig) {
                return (await _axios.put<T>(url, data, config)).data;
            }
            
            export async function axiosDelete<T>(url: string, data: object = {}, config?: AxiosRequestConfig) {
                return (await _axios.delete<T>(url, { data, ...config })).data;
            }
            
            export async function axiosPatch<T>(url: string, data: object = {}, config?: AxiosRequestConfig) {
                return (await _axios.patch<T>(url, data, config)).data;
            }
            
            export async function axiosHead<T>(url: string, config?: AxiosRequestConfig) {
                return (await _axios.head<T>(url, config)).data;
            }
            
            export async function axiosOptions<T>(url: string, config?: AxiosRequestConfig) {
                return (await _axios.options<T>(url, config)).data;
            }
        `;
    }
}
