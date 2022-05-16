import { MutableRefObject, useEffect, useState } from 'react';
import { IUseSelectBox } from '@components/select-box/hooks/useSelectBox';
import { SelectBoxProps } from '@components/select-box/selectBox';
import { SelectBoxOption } from '@defines/SelectBoxOption';

export interface IUseSelectBoxOptionsParams<T extends number | string>
    extends Pick<IUseSelectBox<T>, 'isOpened'>,
        Pick<SelectBoxProps<T>, 'options' | 'optionSize' | 'placeholder'> {
    keyword: string;
    setKeyword(keyword: string): void;
    searchBarRef: MutableRefObject<HTMLInputElement | null>;
}

export interface IUseSelectBoxOptions<T extends number | string> {
    filteredOptions: SelectBoxOption<T>[];
    dropdownHeight: string;
    optionsWrapperHeight: string;
}

export default function useSelectBoxOptions<T extends number | string>(params: IUseSelectBoxOptionsParams<T>): IUseSelectBoxOptions<T> {
    const { keyword, setKeyword, isOpened, options = [], searchBarRef, optionSize = 20, placeholder } = params;
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [dropdownHeight, setDropdownHeight] = useState('100%');
    const [optionsWrapperHeight, setOptionsWrapperHeight] = useState('100%');

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
        setFilteredOptions(options.filter(({ name }) => name.indexOf(keyword) > -1));
    }, [keyword]);

    // 필터링 검색바 focus
    useEffect(() => {
        if (searchBarRef.current && isOpened) {
            searchBarRef.current?.focus();
        }
    }, [isOpened, searchBarRef]);

    // 옵션 UI 높이
    useEffect(() => {
        let length = Math.min(filteredOptions.length, optionSize);
        placeholder && length++;
        setDropdownHeight(`${length * 32}px`);

        setOptionsWrapperHeight(placeholder && filteredOptions.length > optionSize ? `calc(100% - 32px)` : '100%');
    }, [optionSize, filteredOptions, placeholder]);

    return {
        filteredOptions,
        dropdownHeight,
        optionsWrapperHeight,
    };
}
