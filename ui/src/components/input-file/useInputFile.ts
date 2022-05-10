import { MutableRefObject, useEffect, useState } from 'react';

export interface IUseInputFileParams {
    inputRef: MutableRefObject<HTMLInputElement | null>;
    acceptableExtensionList: string[];
}

export interface IUseInputFile {
    handleSelectFile(): void;
    text: string;
}

export default function useInputFile(params: IUseInputFileParams): IUseInputFile {
    const { inputRef, acceptableExtensionList } = params;
    const initialText = '파일을 선택하세요.';
    const [text, setText] = useState(initialText);

    useEffect(() => {
        const { current } = inputRef;
        if (!current) {
            return;
        }

        const handleChangeFile = () => {
            const { files } = current;
            if (!files || !files[0]) {
                setText(initialText);
                return;
            }

            const { name } = files[0];
            const arr = name.split('.');
            const extension = `.${arr[arr.length - 1]}`;

            if (acceptableExtensionList.indexOf(extension) === -1) {
                alert('유효하지 않은 파일 형식입니다.');
                return;
            }

            setText(name);
        };

        current.addEventListener('change', handleChangeFile);
        return () => current.removeEventListener('change', handleChangeFile);
    }, [inputRef]);

    const handleSelectFile = () => {
        const { current } = inputRef;
        if (!current) {
            return;
        }
        current.files;

        current.click();
    };

    return {
        handleSelectFile,
        text,
    };
}
