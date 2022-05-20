import { IUseHomeHandlers, IUseHomeValues } from '@components/home/hooks/useHome';
import useInput from '@hooks/useInput';

export interface ApiDocsUriRowProps extends Pick<IUseHomeValues, 'uri'>, Pick<IUseHomeHandlers, 'setUri'> {}

function ApiDocsUriRow(props: ApiDocsUriRowProps) {
    const { uri, setUri } = props;
    const { onChange } = useInput({ value: uri, setValue: setUri });

    return (
        <>
            <div className={'row'}>
                <span>API docs URI</span>
                <input className={'uri'} placeholder={'https://my-application.net/api-docs'} value={uri} onChange={onChange} />
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
