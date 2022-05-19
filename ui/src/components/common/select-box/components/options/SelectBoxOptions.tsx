import { useSelectBoxContext } from '@components/common/select-box/context/selectBoxContext';
import SelectBoxOption from '@components/common/select-box/components/options/components/option/SelectBoxOption';
import SelectBoxSearchBar from '@components/common/select-box/components/options/components/search-bar/SelectBoxSearchBar';
import useInput from '@hooks/useInput';
import useSelectBoxOptions from '@components/common/select-box/components/options/components/hooks/useSelectBoxOptions';
import { useRef } from 'react';
import Scrollbars from 'react-custom-scrollbars';

function SelectBoxOptions() {
    const { props, useHook } = useSelectBoxContext();
    const {
        values: { isOpened },
    } = useHook;
    const { options = [], placeholder, optionSize } = props;
    const { value: keyword, setValue: setKeyword, onChange } = useInput();
    const searchBarRef = useRef<HTMLInputElement>(null);
    const {
        values: { filteredOptions, dropdownHeight, optionsWrapperHeight },
    } = useSelectBoxOptions({
        keyword,
        setKeyword,
        isOpened,
        options,
        searchBarRef,
        optionSize,
        placeholder,
    });

    if (!isOpened || options.length === 0) {
        return null;
    }

    return (
        <>
            <div className={'options'}>
                {placeholder && <SelectBoxSearchBar keyword={keyword} onChange={onChange} searchBarRef={searchBarRef} />}

                <div className={'options-wrapper'}>
                    <Scrollbars renderTrackHorizontal={() => <div />} renderThumbHorizontal={() => <div />} hideTracksWhenNotNeeded>
                        {filteredOptions.map((option) => (
                            <SelectBoxOption key={option.value} option={option} />
                        ))}
                    </Scrollbars>
                </div>
            </div>

            <style jsx>{`
                .options {
                    position: absolute;
                    width: 100%;
                    background: white;
                    border-radius: 5px;
                    height: ${dropdownHeight};
                    top: calc(100% + 10px);
                    border: 1px solid #0070f3;
                    z-index: 10;
                }

                .options-wrapper {
                    height: ${optionsWrapperHeight};
                }
            `}</style>
        </>
    );
}

export default SelectBoxOptions;
