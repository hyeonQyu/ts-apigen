import { BaseRootLabelProps } from '@components/home/components/label-container/base-root-label-container/components/BaseRootLabel';

export interface IUseBaseRootLabelParams extends BaseRootLabelProps {}

export interface IUseBaseRootLabel {
    values: IUseBaseRootLabelValues;
    handlers: IUseBaseRootLabelHandlers;
}

export interface IUseBaseRootLabelValues {}

export interface IUseBaseRootLabelHandlers {
    handleClickDeleteLabel: () => void;
}

export default function useBaseRootLabel(params: IUseBaseRootLabelParams): IUseBaseRootLabel {
    const { baseRoot, setBaseRootSet } = params;

    const handleClickDeleteLabel = () => {
        setBaseRootSet((prev) => {
            prev.delete(baseRoot);
            return new Set(prev);
        });
    };

    return {
        values: {},
        handlers: {
            handleClickDeleteLabel,
        },
    };
}
