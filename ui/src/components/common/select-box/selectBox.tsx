import React, { useRef } from 'react';
import { SelectBoxContext } from './context/selectBoxContext';
import SelectBoxHead from '@components/common/select-box/components/head/SelectBoxHead';
import { SelectBoxOption } from '@defines/SelectBoxOption';
import useSelectBox from '@components/common/select-box/hooks/useSelectBox';
import SelectBoxOptions from '@components/common/select-box/components/options/SelectBoxOptions';

export interface SelectBoxProps<T extends number | string> {
    /** 선택할 수 있는 항목 목록 */
    options?: SelectBoxOption<T>[];

    /** 선택된 값으로 배열인 경우 다중 선택, number 혹은 string 인 경우 단일 선택 */
    value?: T | T[];

    /** 너비 */
    width?: number | string;

    /** 필터링 검색바 placeholder, 값이 존재하는 경우에만 검색바가 생김 */
    placeholder?: string;

    /** 선택된 값이 없을 때 출력되는 메시지 */
    boxTitle?: string;

    /** 비활성화 여부 */
    disabled?: boolean;

    /** 특정 옵션 선택 시 실행되는 콜백 */
    onChange?(value: T, selected?: boolean): void;

    /** 한번에 보이는 option 최대 갯수 */
    optionSize?: number;
}

function SelectBox<T extends string | number>(props: SelectBoxProps<T>) {
    const { width = '100%' } = props;
    const ref = useRef(null);
    const selectBox = useSelectBox<T>({ ...props, ref });

    return (
        <>
            <SelectBoxContext.Provider value={{ props, useHook: selectBox }}>
                <div className={'wrapper'} ref={ref}>
                    <SelectBoxHead />
                    <SelectBoxOptions />
                </div>
            </SelectBoxContext.Provider>

            <style jsx>{`
                .wrapper {
                    padding: 0;
                    width: ${typeof width === 'string' ? width : `${width}px`};
                    position: relative;
                }
            `}</style>
        </>
    );
}

export default SelectBox;
