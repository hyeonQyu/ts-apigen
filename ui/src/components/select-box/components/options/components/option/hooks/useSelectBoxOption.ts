import { IUseSelectBoxHandlers, IUseSelectBoxValues } from '@components/select-box/hooks/useSelectBox';

export interface IUseSelectBoxOptionParams<T extends number | string>
    extends Pick<IUseSelectBoxHandlers<T>, 'select'>,
        Pick<IUseSelectBoxValues<T>, 'selectedValueSet'> {
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
    const { select, value, selectedValueSet } = params;

    const handleSelect = () => {
        select(value);
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
