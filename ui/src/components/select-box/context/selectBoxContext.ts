import React from 'react';
import { SelectBoxProps } from '@components/select-box/selectBox';
import { IUseSelectBox } from '@components/select-box/hooks/useSelectBox';

export interface ISelectBoxContext<T extends string | number> {
    props: Omit<SelectBoxProps<T>, 'width'>;
    useHook: IUseSelectBox<T>;
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
});

export const useSelectBoxContext = () => React.useContext(SelectBoxContext);
