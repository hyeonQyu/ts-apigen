import { IUseHomeHandlers, IUseHomeValues } from '@components/home/useHome';
import useInput from '@hooks/useInput';
import useApiDocsUri from '@components/home/components/form-rows/apiDocsUri/useApiDocsUri';
import FormRow from '@components/home/components/form-rows/common/formRow';

export interface ApiDocsUriRowProps extends Pick<IUseHomeValues, 'uri'>, Pick<IUseHomeHandlers, 'setUri' | 'setIsLoadController'> {}

function ApiDocsUriRow(props: ApiDocsUriRowProps) {
    const { uri, setUri, setIsLoadController } = props;
    const { onChange } = useInput({ value: uri, setValue: setUri });
    const {
        handlers: { handleBlur, handleFocus },
    } = useApiDocsUri({ setIsLoadController });

    return (
        <>
            <FormRow title={'API docs URI'} required>
                <input
                    className={'uri'}
                    placeholder={'https://my-application.net/api-docs'}
                    value={uri}
                    onChange={onChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
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
