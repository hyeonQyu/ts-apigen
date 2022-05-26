import FormRow from '@components/home/components/form-rows/common/formRow';
import useInput from '@hooks/useInput';
import { useHomeContext } from '@components/home/context/homeContext';

function BaseRootAddRow() {
    const {
        values: { baseRoot },
        handlers: { handleBaseRootAddInputKeyPress, setBaseRoot },
    } = useHomeContext();
    const { onChange } = useInput({ value: baseRoot, setValue: setBaseRoot });

    return (
        <>
            <FormRow title={'Base Root 추가'}>
                <input placeholder={'root/'} onKeyPress={handleBaseRootAddInputKeyPress} onChange={onChange} value={baseRoot} />
            </FormRow>

            <style jsx>{`
                input {
                    width: 100%;
                    height: 32px;
                    outline: none;
                    border: 1px solid gray;
                    border-radius: 5px;
                    padding: 0 10px;
                }

                input:focus {
                    border: 1px solid cornflowerblue;
                }
            `}</style>
        </>
    );
}

export default BaseRootAddRow;
