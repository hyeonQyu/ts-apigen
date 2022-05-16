import React, { useRef } from 'react';
import useInputFile from './useInputFile';

export interface InputFileProps<T> {
    acceptableExtensionList: string[];
    isFileJson?: boolean;
    onChangeFileContent?(fileContent: T | null): void;
}

function InputFile<T>(props: InputFileProps<T>) {
    const { acceptableExtensionList } = props;
    const ref = useRef(null);

    const { handleSelectFile, text } = useInputFile<T>({
        inputRef: ref,
        ...props,
    });

    return (
        <>
            <div>
                <button onClick={handleSelectFile}>파일 선택</button>
                <span>{text}</span>
                <input type={'file'} ref={ref} accept={acceptableExtensionList.join()} />
            </div>

            <style jsx>{`
                button {
                    background-color: white;
                    border: 1px solid #a1a1a1;
                    border-radius: 5px;
                    cursor: pointer;
                    color: #5f5f5f;
                    padding: 5px 10px;
                }

                button:hover {
                    border: 1px solid #4f8ff1;
                    color: #4488f1;
                }

                span {
                    margin-left: 10px;
                    color: #5f5f5f;
                }

                input {
                    position: absolute;
                    display: none;
                }
            `}</style>
        </>
    );
}

export default InputFile;
