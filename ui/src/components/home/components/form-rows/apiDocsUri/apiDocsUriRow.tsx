import { IUseHomeHandlers, IUseHomeValues } from '@components/home/useHome';
import useInput from '@hooks/useInput';
import useApiDocsUri from '@components/home/components/form-rows/apiDocsUri/useApiDocsUri';

export interface ApiDocsUriRowProps extends Pick<IUseHomeValues, 'uri'>, Pick<IUseHomeHandlers, 'setUri' | 'setIsLoadController'> {}

function ApiDocsUriRow(props: ApiDocsUriRowProps) {
    const { uri, setUri, setIsLoadController } = props;
    const { onChange } = useInput({ value: uri, setValue: setUri });
    const {
        handlers: { handleBlur },
    } = useApiDocsUri({ setIsLoadController });

    return (
        <>
            <div className={'row'}>
                <span>API docs URI</span>
                <input
                    className={'uri'}
                    placeholder={'https://my-application.net/api-docs'}
                    value={uri}
                    onChange={onChange}
                    onBlur={handleBlur}
                />
            </div>

            <style jsx>{`
                .uri {
                    width: 70%;
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
