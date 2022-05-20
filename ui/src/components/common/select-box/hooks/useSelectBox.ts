import { SelectBoxProps } from '@components/common/select-box/selectBox';
import { MutableRefObject, useEffect, useState } from 'react';

export interface IUseSelectBoxParams<T extends number | string>
    extends Pick<SelectBoxProps<T>, 'options' | 'value' | 'boxTitle' | 'disabled' | 'onChange'> {
    ref: MutableRefObject<HTMLDivElement | null>;
}

export interface IUseSelectBox<T extends number | string> {
    values: IUseSelectBoxValues<T>;
    handlers: IUseSelectBoxHandlers<T>;
}

export interface IUseSelectBoxValues<T extends number | string> {
    message: string;
    isMultiSelect: boolean;
    selectedValueSet: Set<T>;
    isOpened: boolean;
}

export interface IUseSelectBoxHandlers<T extends number | string> {
    toggleOpen(): void;
    select(value: T, index: number): void;
}

export default function useSelectBox<T extends number | string>(params: IUseSelectBoxParams<T>): IUseSelectBox<T> {
    const { options = [], value, boxTitle = '옵션을 선택하세요.', ref, disabled, onChange = () => {} } = params;
    const [message, setMessage] = useState<string>(boxTitle);
    const [nameByValue, setNameByValue] = useState(new Map<T, string>());
    const [selectedValueSet, setSelectedValueSet] = useState(new Set<T>());
    const [isOpened, setIsOpened] = useState(false);
    const isMultiSelect = Array.isArray(value);

    // options 를 Map 형태로 변경
    useEffect(() => {
        nameByValue.clear();

        options.forEach(({ value, name }) => {
            setNameByValue((prev) => {
                prev.set(value, name);
                return new Map(prev);
            });
        });
    }, [options]);

    // 선택된 값의 집합 생성
    useEffect(() => {
        if (!value) {
            return;
        }

        if (isMultiSelect) {
            setSelectedValueSet(new Set(value));
        } else {
            setSelectedValueSet(new Set([value]));
        }
    }, [value]);

    // 표시되는 메시지
    useEffect(() => {
        if (options.length === 0) {
            setMessage('선택 가능한 옵션이 없습니다.');
            return;
        }

        if (isMultiSelect) {
            let count = 0;
            options.forEach(({ value }) => {
                if (selectedValueSet.has(value)) {
                    count++;
                }
            });

            if (count === 0) {
                setMessage(boxTitle);
                return;
            }
            setMessage(`${count}개 선택 완료`);
        } else {
            if (!value) {
                setMessage(boxTitle);
                return;
            }

            if (!nameByValue.has(value)) {
                console.warn('SelectBox:', `options 중 value가 ${value}인 값을 가지고 있는 option이 없습니다.`);
                setMessage(boxTitle);
                return;
            }

            setMessage(nameByValue.get(value) ?? boxTitle);
        }
    }, [selectedValueSet, boxTitle, nameByValue]);

    const closeSelectBox = (e: any) => {
        if (isOpened && (!ref.current || !ref.current.contains(e.target))) {
            setIsOpened(false);
        }
    };

    // 다른 곳 클릭 시 SelectBox 닫음
    useEffect(() => {
        window.addEventListener('click', closeSelectBox);
        return () => {
            window.removeEventListener('click', closeSelectBox);
        };
    }, [isOpened]);

    const toggleOpen = () => {
        if (disabled) {
            return;
        }
        setIsOpened((prev) => !prev);
    };

    const select = (value: T, index: number) => {
        if (disabled) {
            return;
        }

        onChange(value, !selectedValueSet.has(value), index);
        setIsOpened(false);
    };

    return {
        values: {
            message,
            isMultiSelect,
            selectedValueSet,
            isOpened,
        },

        handlers: {
            toggleOpen,
            select,
        },
    };
}
