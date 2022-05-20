import { SelectBoxOption } from '@defines/SelectBoxOption';
import { ControllerSelectRowProps } from '@components/home/components/form-rows/controllerSelect/controllerSelectRow';
import { useEffect, useState } from 'react';

export interface IUseControllerSelectRowParams extends ControllerSelectRowProps {}

export interface IUseControllerSelectRow {
    values: IUseControllerSelectRowValues;
    handlers: IUseControllerSelectRowHandlers;
}

export interface IUseControllerSelectRowValues {
    controllerOptions: SelectBoxOption<string>[];
    selectedControllerNames: string[];
}

export interface IUseControllerSelectRowHandlers {
    handleChangeSelectedOptions: (value: string, selected?: boolean) => void;
}

export default function useControllerSelectRow(params: IUseControllerSelectRowParams): IUseControllerSelectRow {
    const { controllers, setControllers } = params;
    const [controllerOptions, setControllerOptions] = useState<SelectBoxOption<string>[]>([]);
    const [selectedControllerNames, setSelectedControllerNames] = useState<string[]>([]);

    useEffect(() => {
        setControllerOptions(controllers.map(({ name }) => ({ name, value: name })));
        setSelectedControllerNames(controllers.filter(({ checked }) => checked).map(({ name }) => name));
    }, [controllers]);

    const handleChangeSelectedOptions = (value: string, selected: boolean = true) => {
        setControllers(
            controllers.map(({ name, checked }) => {
                return {
                    name,
                    checked: name === value ? selected : checked,
                };
            }),
        );
    };

    return {
        values: {
            controllerOptions,
            selectedControllerNames,
        },
        handlers: {
            handleChangeSelectedOptions,
        },
    };
}
