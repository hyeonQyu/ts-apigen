export interface PrettierConfig {
    printWidth?: number;
    tabWidth?: number;
    useTabs?: boolean;
    semi?: boolean;
    singleQuote?: boolean;
    quoteProps?: 'as-needed' | 'consistent' | 'preserve';
    jsxSingleQuote?: boolean;
    trailingComma?: 'es5' | 'none' | 'all';
    bracketSpacing?: boolean;
    bracketSameLine?: boolean;
    arrowParens?: 'always' | 'avoid';
    rangeStart?: number;
    rangeEnd?: number;
    parser?:
        | 'babel'
        | 'babel-flow'
        | 'babel-ts'
        | 'flow'
        | 'typescript'
        | 'espree'
        | 'meriyah'
        | 'acorn'
        | 'css'
        | 'scss'
        | 'less'
        | 'json'
        | 'json5'
        | 'json-stringify'
        | 'graphql'
        | 'markdown'
        | 'mdx'
        | 'html'
        | 'vue'
        | 'angular'
        | 'lwc'
        | 'yaml';
    filepath?: string;
    requirePragma?: boolean;
    insertPragma?: boolean;
    proseWrap?: 'always' | 'never' | 'preserve';
    htmlWhitespaceSensitivity?: 'css' | 'strict' | 'ignore';
    vueIndentScriptAndStyle?: boolean;
    endOfLine?: 'lf' | 'crlf' | 'cr' | 'auto';
    embeddedLanguageFormatting?: 'auto' | 'off';
    singleAttributePerLine?: boolean;
}
