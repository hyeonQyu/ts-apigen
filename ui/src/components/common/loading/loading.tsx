export interface LoadingProps {}

function Loading(props: LoadingProps) {
    const {} = props;

    return (
        <>
            <div className={'wrapper'}>로딩중</div>

            <style jsx>{`
                .wrapper {
                    width: 100%;
                    height: 100%;
                    background: black;
                    opacity: 0.1;
                    color: white;
                }
            `}</style>
        </>
    );
}

export default Loading;
