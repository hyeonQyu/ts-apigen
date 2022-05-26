export namespace CaseStyleFormatter {
    export function snakeCaseToPascalCase(str: string): string {
        return str
            .split('-')
            .map((v) => `${v[0].toUpperCase()}${v.substring(1).toLowerCase()}`)
            .join('');
    }

    export function camelCaseToPascalCase(str: string): string {
        return `${str.charAt(0).toUpperCase()}${str.substring(1)}`;
    }
}
