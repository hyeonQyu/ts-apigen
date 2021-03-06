import React, { useRef } from 'react';
import useInputFile from './useInputFile';

export interface InputFileProps<T> {
    acceptableExtensionList: string[];
    isFileJson?: boolean;
    onChangeFileName?: (name: string) => void;
    onChangeFileContent?: (fileContent: T) => void;
    onMouseEnterText?: () => void;
    onMouseLeaveText?: () => void;
    text?: string;
}

function InputFile<T>(props: InputFileProps<T>) {
    const { acceptableExtensionList, text, onMouseEnterText = () => {}, onMouseLeaveText = () => {} } = props;
    const ref = useRef(null);

    const { handleSelectFile } = useInputFile<T>({
        inputRef: ref,
        ...props,
    });

    return (
        <>
            <div>
                <button onClick={handleSelectFile} type={'button'}>
                    파일 선택
                </button>
                <span onMouseEnter={onMouseEnterText} onMouseLeave={onMouseLeaveText}>
                    {text}
                </span>
                <input type={'file'} ref={ref} accept={acceptableExtensionList.join()} />
            </div>

            <style jsx>{`
                button {
                    background-color: white;
                    border: 1px solid #a1a1a1;
                    border-radius: 20px;
                    cursor: pointer;
                    color: #5f5f5f;
                    padding: 5px 10px;
                    transition: 0.3s;
                }

                button:hover {
                    background-color: #f3f7f8;
                    border: 1px solid #cecece;
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
