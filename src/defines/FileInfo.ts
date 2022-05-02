export interface FileInfo {
    refs: string[];
    typeInfo: TypeInfo;
}

export type TypeInfo = {
    [key in string]?: string;
};
