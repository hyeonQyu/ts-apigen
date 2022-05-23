import { IUseSelectBoxHandlers, IUseSelectBoxValues } from '@components/common/select-box/useSelectBox';
import { SelectBoxOptionProps } from '@components/common/select-box/components/options/components/option/SelectBoxOption';

export interface IUseSelectBoxOptionParams<T extends number | string>
    extends Pick<IUseSelectBoxHandlers<T>, 'select'>,
        Pick<IUseSelectBoxValues<T>, 'selectedValueSet'>,
        Pick<SelectBoxOptionProps<T>, 'index'> {
    value: T;
}

export interface IUseSelectBoxOption {
    values: IUseSelectBoxOptionValues;
    handlers: IUseSelectBoxOptionHandlers;
}

export interface IUseSelectBoxOptionValues {
    selected: boolean;
}

export interface IUseSelectBoxOptionHandlers {
    handleSelect(): void;
}

export default function useSelectBoxOption<T extends number | string>(params: IUseSelectBoxOptionParams<T>): IUseSelectBoxOption {
    const { select, value, selectedValueSet, index } = params;

    const handleSelect = () => {
        select(value, index);
    };

    const selected = selectedValueSet.has(value);

    return {
        values: {
            selected,
        },
        handlers: {
            handleSelect,
        },
    };
}
