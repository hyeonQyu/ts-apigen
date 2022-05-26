import useInput from '@hooks/useInput';
import FormRow from '@components/home/components/form-rows/common/formRow';
import { useHomeContext } from '@components/home/context/homeContext';

function ApiDocsUriRow() {
    const {
        values: { uri },
        handlers: { setUri, handleUseApiDocsUriBlur, handleUseAPiDocsUriFocus },
    } = useHomeContext();
    const { onChange } = useInput({ value: uri, setValue: setUri });

    return (
        <>
            <FormRow title={'API docs URI'} required>
                <input
                    className={'uri'}
                    placeholder={'https://my-application.net/api-docs'}
                    value={uri}
                    onChange={onChange}
                    onBlur={handleUseApiDocsUriBlur}
                    onFocus={handleUseAPiDocsUriFocus}
                />
            </FormRow>

            <style jsx>{`
                .uri {
                    width: 100%;
                    height: 32px;
                    outline: none;
                    border: 1px solid gray;
                    border-radius: 5px;
                    padding: 0 10px;
                }

                .uri:focus {
                    border: 1px solid cornflowerblue;
                }
            `}</style>
        </>
    );
}

export default ApiDocsUriRow;
