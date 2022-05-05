export namespace CaseStyleFormatter {
    export function snakeCaseToPascalCase(str: string): string {
        return str
            .split('-')
            .map((v) => `${v[0].toUpperCase()}${v.substring(1).toLowerCase()}`)
            .join('');
    }
}
