import SelectBox from '@components/common/select-box/selectBox';
import { IUseHomeHandlers, IUseHomeValues } from '@components/home/hooks/useHome';
import useHttpApiSelectRow from '@components/home/components/form-rows/httpApiSelect/hooks/useHttpApiSelectRow';

export interface HttpApiSelectRowProps extends Pick<IUseHomeValues, 'httpApiType'>, Pick<IUseHomeHandlers, 'setHttpApiType'> {}

function HttpApiSelectRow(props: HttpApiSelectRowProps) {
    const { httpApiType, setHttpApiType } = props;
    const {
        values: { httpApiTypeOptions },
        handlers: { handleSelectHttpApiType },
    } = useHttpApiSelectRow({ setHttpApiType });

    return (
        <>
            <div className={'row'}>
                <span>HTTP 통신 방식</span>
                <div className={'value'}>
                    <SelectBox value={httpApiType} options={httpApiTypeOptions} onChange={handleSelectHttpApiType} />
                </div>
            </div>

            <style jsx>{``}</style>
        </>
    );
}

export default HttpApiSelectRow;
