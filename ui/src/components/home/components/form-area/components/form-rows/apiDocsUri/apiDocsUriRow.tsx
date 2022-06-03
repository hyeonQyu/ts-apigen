import useInput from '@hooks/common/useInput';
import FormRow from '@components/home/components/form-area/components/form-rows/common/formRow';
import { useHomeContext } from '@components/home/context/homeContext';

function ApiDocsUriRow() {
    const {
        values: { uri },
        handlers: { setUri, handleUseApiDocsUriBlur, handleUseApiDocsUriFocus },
    } = useHomeContext();
    const { onChange } = useInput({ value: uri, setValue: setUri });

    return (
        <>
            <FormRow title={'API docs URI'} required>
                <input
                    placeholder={'https://my-application.net/api-docs'}
                    value={uri}
                    onChange={onChange}
                    onBlur={handleUseApiDocsUriBlur}
                    onFocus={handleUseApiDocsUriFocus}
                />
            </FormRow>

            <style jsx>{``}</style>
        </>
    );
}

export default ApiDocsUriRow;
