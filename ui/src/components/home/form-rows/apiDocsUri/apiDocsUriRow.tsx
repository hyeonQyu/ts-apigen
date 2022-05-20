export interface ApiDocsUriRowProps {}

function ApiDocsUriRow(props: ApiDocsUriRowProps) {
    const {} = props;

    return (
        <>
            <div className={'row'}>
                <span>API docs URI</span>
                <input className={'uri'} placeholder={'https://my-application.net/api-docs'} />
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
