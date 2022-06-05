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
}
