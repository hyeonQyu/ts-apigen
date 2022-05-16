import { IUseSelectBox } from '@components/select-box/hooks/useSelectBox';

export interface IUseSelectBoxOptionParams<T extends number | string> extends Pick<IUseSelectBox<T>, 'select' | 'selectedValueSet'> {
    value: T;
}

export interface IUseSelectBoxOption {
    handleSelect(): void;
    selected: boolean;
}

export default function useSelectBoxOption<T extends number | string>(params: IUseSelectBoxOptionParams<T>): IUseSelectBoxOption {
    const { select, value, selectedValueSet } = params;

    const handleSelect = () => {
        select(value);
    };

    const selected = selectedValueSet.has(value);

    return {
        handleSelect,
        selected,
    };
}
