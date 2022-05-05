export namespace ImportGenerator {
    export function getImportCode(refSet: Set<string>, path: string = '.'): string {
        return `${Array.from(refSet)
            ?.map((ref) => `import { ${ref} } from \'${path}/${ref}\';\n`)
            .join('')}\n`;
    }
}
