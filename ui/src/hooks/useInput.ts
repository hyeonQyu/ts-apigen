import { ChangeEventHandler, useState } from 'react';

export interface IUseInputParams {
    value: string;
    setValue: (value: string) => void;
}

export interface IUseInput {
    value: string;
    setValue(value: string): void;
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
