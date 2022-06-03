import { useSelectBoxContext } from '@components/common/select-box/context/selectBoxContext';
import SelectBoxOption from '@components/common/select-box/components/options/components/option/SelectBoxOption';
import SelectBoxSearchBar from '@components/common/select-box/components/options/components/search-bar/SelectBoxSearchBar';
import useInput from '@hooks/common/useInput';
import useSelectBoxOptions from '@components/common/select-box/components/options/useSelectBoxOptions';
import { useRef } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import classNames from 'classnames';

function SelectBoxOptions() {
    const {
        props: { options = [], placeholder, optionSize },
        useHook: {
            values: { isOpened },
        },
        height,
    } = useSelectBoxContext();
    const { value: keyword, setValue: setKeyword, onChange } = useInput();
    const searchBarRef = useRef<HTMLInputElement>(null);
    const {
        values: { mounted, filteredOptions, dropdownHeight, optionsWrapperHeight, appearAnimationDuration, disappearAnimationDuration },
    } = useSelectBoxOptions({
        keyword,
        setKeyword,
        isOpened,
        options,
        searchBarRef,
        optionSize,
        placeholder,
        height,
    });

    if (!mounted || options.length === 0) {
        return null;
    }

    return (
        <>
            <div className={classNames('options', !isOpened && 'closed')}>
                {placeholder && <SelectBoxSearchBar keyword={keyword} onChange={onChange} searchBarRef={searchBarRef} />}

                <div className={classNames('select-box__options-wrapper')}>
                    <Scrollbars renderTrackHorizontal={() => <div />} renderThumbHorizontal={() => <div />} hideTracksWhenNotNeeded>
                        {filteredOptions.map((option, i) => (
                            <SelectBoxOption key={option.value} option={option} index={i} />
                        ))}
                    </Scrollbars>
                </div>
            </div>

            <style jsx global>{`
                @keyframes open {
                    0% {
                        height: 0;
                    }
                }
                .options {
                    position: absolute;
                    width: 100%;
                    background: white;
                    border-radius: 20px;
                    height: ${dropdownHeight};
                    top: calc(100% + 10px);
                    box-shadow: 5px 6px 25px -16px;
                    z-index: 10;
                    transition: height ${disappearAnimationDuration}s ease-in-out;
                    animation: open ${appearAnimationDuration}s;
                }

                .options.closed {
                    height: 0;
                }

                .select-box__options-wrapper {
                    height: ${optionsWrapperHeight};
                }

                .select-box__options-wrapper > div {
                    border-radius: 20px;
                }
            `}</style>
        </>
    );
}

export default SelectBoxOptions;
