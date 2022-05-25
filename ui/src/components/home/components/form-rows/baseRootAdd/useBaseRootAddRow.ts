import { BaseRootAddRowProps } from '@components/home/components/form-rows/baseRootAdd/baseRootAddRow';
import { Dispatch, KeyboardEventHandler, SetStateAction } from 'react';

export interface IUseBaseRootAddRowParams extends BaseRootAddRowProps {
    baseRoot: string;
    setBaseRoot: Dispatch<SetStateAction<string>>;
}

export interface IUseBaseRootAddRow {
    values: IUseBaseRootAddRowValues;
    handlers: IUseBaseRootAddRowHandlers;
}

export interface IUseBaseRootAddRowValues {}

export interface IUseBaseRootAddRowHandlers {
    handleInputKeyPress: KeyboardEventHandler<HTMLInputElement>;
}

export default function useBaseRootAddRow(params: IUseBaseRootAddRowParams): IUseBaseRootAddRow {
    const { setBaseRootSet, baseRoot, setBaseRoot } = params;

    const handleInputKeyPress: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === 'Enter') {
            if (!baseRoot) {
                return;
            }

            setBaseRootSet((prev) => {
                prev.add(baseRoot);
                return new Set(prev);
            });

            setBaseRoot('');
        }
    };

    return {
        values: {},
        handlers: {
            handleInputKeyPress,
        },
    };
}
