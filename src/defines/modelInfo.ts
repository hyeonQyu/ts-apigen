export interface ModelInfo {
    refSet: Set<string>;
    typeInfo: TypeInfo;
}

export type TypeInfo = {
    [key in string]?: string;
};
