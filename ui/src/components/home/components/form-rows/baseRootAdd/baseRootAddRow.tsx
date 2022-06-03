import FormRow from '@components/home/components/form-rows/common/formRow';
import useInput from '@hooks/common/useInput';
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

            <style jsx>{``}</style>
        </>
    );
}

export default BaseRootAddRow;
