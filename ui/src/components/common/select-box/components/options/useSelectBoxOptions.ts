import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { IUseSelectBoxValues } from '@components/common/select-box/useSelectBox';
import { SelectBoxProps } from '@components/common/select-box/selectBox';
import { SelectBoxOption } from '@components/common/select-box/defines/selectBoxOption';
import { ISelectBoxContext } from '@components/common/select-box/context/selectBoxContext';
import useAnimationMount from '@hooks/common/useAnimationMount';

export interface IUseSelectBoxOptionsParams<T extends number | string>
    extends Pick<IUseSelectBoxValues<T>, 'isOpened'>,
        Pick<SelectBoxProps<T>, 'options' | 'optionSize' | 'placeholder'>,
        Pick<ISelectBoxContext<T>, 'height'> {
    keyword: string;
    setKeyword(keyword: string): void;
}

export interface IUseSelectBoxOptions<T extends number | string> {
    values: IUseSelectBoxOptionsValues<T>;
    handlers: IUseSelectBoxOptionsHandlers;
}

export interface IUseSelectBoxOptionsValues<T extends number | string> {
    searchBarRef: MutableRefObject<HTMLInputElement | null>;
    mounted: boolean;
    filteredOptions: SelectBoxOption<T>[];
    dropdownHeight: string;
    optionsWrapperHeight: string;
    appearAnimationDuration: number;
    disappearAnimationDuration: number;
}

export interface IUseSelectBoxOptionsHandlers {}

export default function useSelectBoxOptions<T extends number | string>(params: IUseSelectBoxOptionsParams<T>): IUseSelectBoxOptions<T> {
    const { keyword, setKeyword, isOpened, options = [], optionSize = 20, placeholder, height } = params;
    const searchBarRef = useRef<HTMLInputElement>(null);
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [dropdownHeight, setDropdownHeight] = useState('100%');
    const [optionsWrapperHeight, setOptionsWrapperHeight] = useState('100%');
    const appearAnimationDuration = 0.4;
    const disappearAnimationDuration = 0.2;

    const {
        values: { mounted },
    } = useAnimationMount({ isOpened, disappearAnimationDuration });

    // 필터링 검색어 제거
    useEffect(() => {
        if (!isOpened) {
            setKeyword('');
        }
    }, [isOpened]);

    // 필터링 된 옵션 목록
    useEffect(() => {
        if (!keyword) {
            setFilteredOptions(options);
            return;
        }
        setFilteredOptions(options.filter(({ name }) => name.toLowerCase().indexOf(keyword.toLowerCase()) > -1));
    }, [keyword, options]);

    // 필터링 검색바 focus
    useEffect(() => {
        if (isOpened) {
            setTimeout(() => {
                if (isOpened) {
                    searchBarRef.current?.focus();
                }
            }, appearAnimationDuration);
        }
    }, [isOpened, searchBarRef]);

    // 옵션 UI 높이
    useEffect(() => {
        let length = Math.min(filteredOptions.length, optionSize);
        placeholder && length++;
        setDropdownHeight(`${length * height}px`);
        setOptionsWrapperHeight(placeholder && filteredOptions.length > optionSize ? `calc(100% - ${height}px)` : '100%');
    }, [optionSize, filteredOptions, placeholder]);

    return {
        values: {
            searchBarRef,
            mounted,
            filteredOptions,
            dropdownHeight,
            optionsWrapperHeight,
            appearAnimationDuration,
            disappearAnimationDuration,
        },
        handlers: {},
    };
}
