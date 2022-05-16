import React from 'react';
import { SelectBoxProps } from '@components/select-box/selectBox';
import { IUseSelectBox } from '@components/select-box/hooks/useSelectBox';

export interface ISelectBoxContext<T extends string | number> extends Partial<IUseSelectBox<T>>, Omit<SelectBoxProps<T>, 'width'> {}

export const SelectBoxContext = React.createContext<ISelectBoxContext<any>>({});

export const useSelectBoxContext = () => React.useContext(SelectBoxContext);
