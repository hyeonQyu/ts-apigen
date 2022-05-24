import SelectBox from '@components/common/select-box/selectBox';
import { IUseHomeHandlers, IUseHomeValues } from '@components/home/useHome';
import useHttpApiSelectRow from '@components/home/components/form-rows/httpApiSelect/useHttpApiSelectRow';
import FormRow from '@components/home/components/form-rows/common/formRow';

export interface HttpApiSelectRowProps extends Pick<IUseHomeValues, 'httpApiType'>, Pick<IUseHomeHandlers, 'setHttpApiType'> {}

function HttpApiSelectRow(props: HttpApiSelectRowProps) {
    const { httpApiType, setHttpApiType } = props;
    const {
        values: { httpApiTypeOptions },
        handlers: { handleSelectHttpApiType },
    } = useHttpApiSelectRow({ setHttpApiType });

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
