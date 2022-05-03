export interface FileInfo {
    refSet: Set<string>;
    typeInfo: TypeInfo;
}

export type TypeInfo = {
    [key in string]?: string;
};
