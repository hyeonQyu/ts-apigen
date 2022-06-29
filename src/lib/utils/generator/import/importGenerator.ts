import { CaseStyleFormatter } from '../../string/caseStyleFormatter';
import { ApigenConfig } from '../../../config/apigenConfig';

export namespace ImportGenerator {
    export function getImportCode(refSet: Set<string>, path?: string): string {
        switch (ApigenConfig.openApiVersion) {
            case 3:
                return getImportCodeOas3(refSet, path);

            case 2:
            default:
                return getImportCodeSwagger2(refSet, path);
        }
    }

    function getImportCodeSwagger2(refSet: Set<string>, path: string = '.'): string {
        return `${Array.from(refSet)
            ?.map((ref) => `import { ${ref} } from \'${path}/${CaseStyleFormatter.pascalCaseToCamelCase(ref)}\';\n`)
            .join('')}\n`;
    }

    function getImportCodeOas3(refSet: Set<string>, path: string = '..'): string {
        return `${Array.from(refSet)
            ?.map((ref) => `import { ${ref.substring('#/components/'.length)} } from \'${path}/${ref}\';\n`)
            .join('')}\n`;
    }
}
