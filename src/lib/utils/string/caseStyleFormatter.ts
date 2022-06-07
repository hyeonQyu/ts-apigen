export namespace CaseStyleFormatter {
    export function kebabCaseToPascalCase(str: string): string {
        return str
            .split('-')
            .map((v) => camelCaseToPascalCase(v))
            .join('');
    }

    export function camelCaseToPascalCase(str: string): string {
        return `${str.charAt(0).toUpperCase()}${str.substring(1)}`;
    }

    export function baseRootToPascalCase(baseRoot: string): string {
        return baseRoot
            .split('/')
            .map((v) => kebabCaseToPascalCase(v))
            .join('');
    }

    export function genericToPascalCase(str?: string): string {
        if (!str) {
            return '';
        }
        return kebabCaseToPascalCase(str.replace(/»/g, '').replace(/«/g, '-').replace(/,/g, '-'));
    }

    export function PascalCaseToCamelCase(str: string) {
        const firstLowerCaseIndex = getFirstLowerCaseIndex(str);
        return `${str.substring(0, firstLowerCaseIndex).toLowerCase()}${str.substring(firstLowerCaseIndex)}`;
    }

    function getFirstLowerCaseIndex(str: string) {
        const length = str.length;
        for (let i = 0; i < length; i++) {
            if (!isUpperCase(str[i])) {
                return i;
            }
        }
        return length - 1;
    }

    function isUpperCase(str: string) {
        return /[A-Z]/.test(str) && !/[a-z]/.test(str);
    }
}
