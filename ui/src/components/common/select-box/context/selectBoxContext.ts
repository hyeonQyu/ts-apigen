import React from 'react';
import { SelectBoxProps } from '@components/common/select-box/selectBox';
import { IUseSelectBox } from '@components/common/select-box/useSelectBox';

export interface ISelectBoxContext<T extends string | number> {
    props: Omit<SelectBoxProps<T>, 'width'>;
    useHook: IUseSelectBox<T>;
    height: number;
}

export const SelectBoxContext = React.createContext<ISelectBoxContext<any>>({
    props: {
        options: [],
        value: '',
        placeholder: '',
        boxTitle: '',
        disabled: false,
        onChange() {},
        optionSize: 20,
    },
    useHook: {
        values: {
            message: '옵션을 선택하세요.',
            isMultiSelect: false,
            selectedValueSet: new Set<string | number>(),
            isOpened: false,
        },
        handlers: {
            toggleOpen() {},
            select() {},
        },
    },
    height: 40,
});

export const useSelectBoxContext = () => React.useContext(SelectBoxContext);
