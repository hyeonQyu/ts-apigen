import { SelectBoxOption } from '@defines/SelectBoxOption';
import { ControllerSelectRowProps } from '@components/home/components/form-rows/controllerSelect/controllerSelectRow';
import { useEffect, useState } from 'react';
import { ControllerOptionInfo } from '@defines/controllerOptionInfo';

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
    const { controllerNames } = params;

    const controllerNamesToControllers: () => ControllerOptionInfo[] = () => controllerNames.map((name) => ({ name, checked: false }));
    const controllersToControllerOptions: () => SelectBoxOption<string>[] = () => controllers.map(({ name }) => ({ name, value: name }));
    const controllersToSelectedControllerNames: () => string[] = () => controllers.filter(({ checked }) => checked).map(({ name }) => name);

    const [controllers, setControllers] = useState<ControllerOptionInfo[]>(controllerNamesToControllers);
    const [controllerOptions, setControllerOptions] = useState<SelectBoxOption<string>[]>(controllersToControllerOptions());
    const [selectedControllerNames, setSelectedControllerNames] = useState<string[]>(controllersToSelectedControllerNames());

    useEffect(() => {
        setControllers(controllerNamesToControllers());
    }, [controllerNames]);

    useEffect(() => {
        setControllerOptions(controllersToControllerOptions());
        setSelectedControllerNames(controllersToSelectedControllerNames());
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
