import { SelectBoxOption } from '@components/common/select-box/defines/selectBoxOption';
import { useSelectBoxContext } from '@components/common/select-box/context/selectBoxContext';
import Checkbox from '@components/common/checkbox/checkbox';
import useSelectBoxOption from '@components/common/select-box/components/options/components/option/useSelectBoxOption';
import classNames from 'classnames';
import Shortening from '@components/common/shortening/Shortening';

export interface SelectBoxOptionProps<T extends number | string> {
    option: SelectBoxOption<T>;
    index: number;
}

function SelectBoxOption<T extends number | string>(props: SelectBoxOptionProps<T>) {
    const { option, index } = props;
    const { value, name, disabled = false } = option;
    const { useHook, height } = useSelectBoxContext();
    const {
        values: { selectedValueSet, isMultiSelect },
        handlers: { select },
    } = useHook;
    const {
        values: { selected },
        handlers: { handleSelect },
    } = useSelectBoxOption<T>({ select, value, selectedValueSet, index, disabled });

    return (
        <>
            <div className={'option'}>
                <div
                    className={classNames('option-inner', !isMultiSelect && selected && 'selected', disabled && 'disabled')}
                    onClick={handleSelect}
                >
                    {isMultiSelect ? (
                        <Checkbox checked={selected}>
                            <Shortening>{name}</Shortening>
                        </Checkbox>
                    ) : (
                        <Shortening>{name}</Shortening>
                    )}
                </div>
            </div>

            <style jsx>{`
                .option {
                    height: ${height}px;
                    padding: 4px 10px;
                    background: white;
                    color: #444444;
                }

                .option-inner {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    padding: 0 10px;
                    border-radius: 20px;
                    cursor: pointer;
                }

                .option-inner:hover,
                .option-inner.selected {
                    background: aliceblue;
                }

                .option-inner.disabled {
                    background: white;
                    opacity: 0.5;
                    cursor: not-allowed;
                }
            `}</style>
        </>
    );
}

export default SelectBoxOption;
