import { SelectBoxOption } from '@defines/selectBoxOption';
import { useSelectBoxContext } from '@components/common/select-box/context/selectBoxContext';
import Checkbox from '@components/common/checkbox/checkbox';
import useSelectBoxOption from '@components/common/select-box/components/options/components/option/useSelectBoxOption';
import classNames from 'classnames';

export interface SelectBoxOptionProps<T extends number | string> {
    option: SelectBoxOption<T>;
    index: number;
}

function SelectBoxOption<T extends number | string>(props: SelectBoxOptionProps<T>) {
    const { option, index } = props;
    const { value, name } = option;
    const { useHook } = useSelectBoxContext();
    const {
        values: { selectedValueSet, isMultiSelect },
        handlers: { select },
    } = useHook;
    const {
        values: { selected },
        handlers: { handleSelect },
    } = useSelectBoxOption<T>({ select, value, selectedValueSet, index });

    return (
        <>
            <div className={classNames('option', !isMultiSelect && selected && 'selected')} onClick={handleSelect}>
                {isMultiSelect ? (
                    <Checkbox checked={selected}>
                        <p>{name}</p>
                    </Checkbox>
                ) : (
                    name
                )}
            </div>

            <style jsx>{`
                .option {
                    height: 32px;
                    padding: 0 15px;
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    border-radius: 5px;
                }

                .option:hover,
                .option.selected {
                    background: aliceblue;
                }
            `}</style>
        </>
    );
}

export default SelectBoxOption;
