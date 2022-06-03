import { useHomeContext } from '@components/home/context/homeContext';
import FormRow from '@components/home/components/form-area/components/form-rows/common/formRow';
import useInput from '@hooks/common/useInput';

function GeneratedCodePathRow() {
    const {
        values: { generatedCodePath },
        handlers: { setGeneratedCodePath },
    } = useHomeContext();
    const { onChange } = useInput({ value: generatedCodePath, setValue: setGeneratedCodePath });

    return (
        <>
            <FormRow title={'자동 생성 코드 경로'}>
                <input className={'path'} value={generatedCodePath} onChange={onChange} />
            </FormRow>

            <style jsx>{``}</style>
        </>
    );
}

export default GeneratedCodePathRow;
