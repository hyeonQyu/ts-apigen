import { ChangeEventHandler, useState } from 'react';

export interface IUseInput {
    value: string;
    setValue(value: string): void;
    onChange: ChangeEventHandler<HTMLInputElement>;
}

export default function useInput(): IUseInput {
    const [value, setValue] = useState('');

    return {
        value,
        setValue,
        onChange(e) {
            setValue(e.target.value);
        },
    };
}
