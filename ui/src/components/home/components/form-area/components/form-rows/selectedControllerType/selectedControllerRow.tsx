import { useHomeContext } from '@components/home/context/homeContext';
import FormRow from '@components/home/components/form-area/components/form-rows/common/formRow';
import { SelectedControllerType } from '@defines/selectedControllerType';

function SelectedControllerRow() {
    const {
        values: { selectedControllerType },
        handlers: { handleChangeSelectedControllerType },
    } = useHomeContext();

    const radioName = 'selectedControllerType';
    const INCLUDE: SelectedControllerType = 'INCLUDE';
    const EXCLUDE: SelectedControllerType = 'EXCLUDE';

    const isChecked = (value: SelectedControllerType): boolean => value === selectedControllerType;

    return (
        <>
            <FormRow title={'선택한 Controller만'} required>
                <div className={'wrapper'}>
                    <label htmlFor={INCLUDE} className={'option'}>
                        <input
                            type={'radio'}
                            name={radioName}
                            value={INCLUDE}
                            id={INCLUDE}
                            checked={isChecked(INCLUDE)}
                            onChange={handleChangeSelectedControllerType}
                        />
                        <span>포함하여 코드 생성</span>
                    </label>

                    <label htmlFor={EXCLUDE} className={'option'}>
                        <input
                            type={'radio'}
                            name={radioName}
                            value={EXCLUDE}
                            id={EXCLUDE}
                            checked={isChecked(EXCLUDE)}
                            onChange={handleChangeSelectedControllerType}
                        />
                        <span>제외하고 코드 생성</span>
                    </label>
                </div>
            </FormRow>

            <style jsx>{`
                .wrapper {
                    display: flex;
                    justify-content: space-around;
                }

                .option {
                    cursor: pointer;
                }

                .option input {
                    width: initial;
                    height: initial;
                }
            `}</style>
        </>
    );
}

export default SelectedControllerRow;
