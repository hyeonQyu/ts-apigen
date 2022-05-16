import { useSelectBoxContext } from '@components/select-box/context/selectBoxContext';
import SelectBoxOption from '@components/select-box/components/options/components/option/SelectBoxOption';
import SelectBoxSearchBar from '@components/select-box/components/options/components/search-bar/SelectBoxSearchBar';
import useInput from '@hooks/useInput';
import useSelectBoxOptions from '@components/select-box/components/options/components/hooks/useSelectBoxOptions';
import { useRef } from 'react';
import Scrollbars from 'react-custom-scrollbars';

function SelectBoxOptions() {
    const { options = [], isOpened = false, placeholder, optionSize } = useSelectBoxContext();
    const { value: keyword, setValue: setKeyword, onChange } = useInput();
    const searchBarRef = useRef<HTMLInputElement>(null);
    const { filteredOptions, dropdownHeight, optionsWrapperHeight } = useSelectBoxOptions({
        keyword,
        setKeyword,
        isOpened,
        options,
        searchBarRef,
        optionSize,
        placeholder,
    });

    if (!isOpened) {
        return null;
    }

    return (
        <>
            <div className={'options'}>
                {placeholder && <SelectBoxSearchBar keyword={keyword} onChange={onChange} searchBarRef={searchBarRef} />}

                <div className={'options-wrapper'}>
                    <Scrollbars
                        renderTrackHorizontal={() => <div />}
                        renderThumbHorizontal={() => <div />}
                        hideTracksWhenNotNeeded
                        autoHide
                    >
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
                }

                .options-wrapper {
                    height: ${optionsWrapperHeight};
                }
            `}</style>
        </>
    );
}

export default SelectBoxOptions;
