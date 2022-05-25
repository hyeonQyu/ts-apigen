import { ChangeEventHandler, Dispatch, SetStateAction, useState } from 'react';

export interface IUseInputParams {
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
}

export interface IUseInput {
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
    onChange: ChangeEventHandler<HTMLInputElement>;
}

export default function useInput(params?: IUseInputParams): IUseInput {
    if (!params) {
        const [value, setValue] = useState('');

        return {
            value,
            setValue,
            onChange(e) {
                setValue(e.target.value);
            },
        };
    }

    const { value, setValue } = params;
    return {
        value,
        setValue,
        onChange(e) {
            setValue(e.target.value);
        },
    };
}
