export interface FileInfo {
    refs: string[];
    typeInfo: ITypeInfo;
}

export type ITypeInfo = {
    [key in string]?: string;
};
