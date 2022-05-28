import { useHomeContext } from '@components/home/context/homeContext';
import FormRow from '@components/home/components/form-rows/common/formRow';
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

            <style jsx>{`
                .path {
                    width: 100%;
                    height: 32px;
                    outline: none;
                    border: 1px solid gray;
                    border-radius: 5px;
                    padding: 0 10px;
                }

                .path:focus {
                    border: 1px solid cornflowerblue;
                }
            `}</style>
        </>
    );
}

export default GeneratedCodePathRow;
