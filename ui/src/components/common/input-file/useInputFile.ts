import { MutableRefObject, useEffect, useState } from 'react';
import { InputFileProps } from '@components/common/input-file/inputFile';
import useToastMessage from '@hooks/common/useToastMessage';

export interface IUseInputFileParams<T> extends InputFileProps<T> {
    inputRef: MutableRefObject<HTMLInputElement | null>;
}

export interface IUseInputFile<T> {
    handleSelectFile(): void;
    text: string;
}

export default function useInputFile<T>(params: IUseInputFileParams<T>): IUseInputFile<T> {
    const { inputRef, acceptableExtensionList, isFileJson = false, onChangeFileContent = () => {} } = params;
    const initialText = '';
    const [text, setText] = useState(initialText);
    const {
        handlers: { showToast },
    } = useToastMessage();

    useEffect(() => {
        const { current } = inputRef;
        if (!current) {
            return;
        }

        const handleChangeFile = async () => {
            const { files } = current;
            if (!files || !files[0]) {
                return;
            }

            const { name } = files[0];
            const arr = name.split('.');
            const extension = `.${arr[arr.length - 1]}`;

            if (acceptableExtensionList.indexOf(extension) === -1) {
                showToast('유효하지 않은 파일 형식입니다.', 'warning');
                return;
            }

            const content = await files[0].text();
            setText(name);
            onChangeFileContent(isFileJson ? JSON.parse(content) : content);
        };

        current.addEventListener('change', handleChangeFile);
        return () => current.removeEventListener('change', handleChangeFile);
    }, [inputRef]);

    const handleSelectFile = () => {
        const { current } = inputRef;
        if (!current) {
            return;
        }

        current.click();
    };

    return {
        handleSelectFile,
        text,
    };
}
