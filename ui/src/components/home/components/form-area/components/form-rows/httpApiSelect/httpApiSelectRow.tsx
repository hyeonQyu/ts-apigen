import SelectBox from '@components/common/select-box/selectBox';
import FormRow from '@components/home/components/form-area/components/form-rows/common/formRow';
import { useHomeContext } from '@components/home/context/homeContext';

function HttpApiSelectRow() {
    const {
        values: { httpApiType, httpApiTypeOptions },
        handlers: { handleSelectHttpApiType },
    } = useHomeContext();

    return (
        <>
            <FormRow title={'HTTP 통신 방식'} required>
                <SelectBox value={httpApiType} options={httpApiTypeOptions} onChange={handleSelectHttpApiType} />
            </FormRow>

            <style jsx>{``}</style>
        </>
    );
}

export default HttpApiSelectRow;
