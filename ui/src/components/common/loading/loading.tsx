import { useRecoilValue } from 'recoil';
import { loadingCountState } from 'stores/store';

export interface LoadingProps {}

function Loading(props: LoadingProps) {
    const {} = props;
    const loadingCount = useRecoilValue(loadingCountState);

    if (loadingCount === 0) {
        return <></>;
    }

    return (
        <>
            <div className={'wrapper'}>
                <div className={'background'} />
                <div className={'loading'}>
                    <div className={'loadingio-spinner-double-ring-0hjs6hp5lmk'}>
                        <div className={'ldio-157102gp7nd'}>
                            <div />
                            <div />
                            <div>
                                <div />
                            </div>
                            <div>
                                <div />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .wrapper {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                }

                .background {
                    background-color: black;
                    opacity: 0.1;
                    width: 100%;
                    height: 100%;
                    position: absolute;
                }

                .loading {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    height: 100%;
                }

                @keyframes ldio-157102gp7nd {
                    0% {
                        transform: rotate(0);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }

                .ldio-157102gp7nd div {
                    box-sizing: border-box !important;
                }

                .ldio-157102gp7nd > div {
                    position: absolute;
                    width: 80px;
                    height: 80px;
                    top: 10px;
                    left: 10px;
                    border-radius: 50%;
                    border: 10px solid #000;
                    border-color: #009ef7 transparent #009ef7 transparent;
                    animation: ldio-157102gp7nd 1s linear infinite;
                }

                .ldio-157102gp7nd > div:nth-child(2),
                .ldio-157102gp7nd > div:nth-child(4) {
                    width: 58px;
                    height: 58px;
                    top: 21px;
                    left: 21px;
                    animation: ldio-157102gp7nd 1s linear infinite reverse;
                }

                .ldio-157102gp7nd > div:nth-child(2) {
                    border-color: transparent #a6d5fa transparent #a6d5fa;
                }

                .ldio-157102gp7nd > div:nth-child(3) {
                    border-color: transparent;
                }

                .ldio-157102gp7nd > div:nth-child(3) div {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    transform: rotate(45deg);
                }

                .ldio-157102gp7nd > div:nth-child(3) div:before,
                .ldio-157102gp7nd > div:nth-child(3) div:after {
                    content: '';
                    display: block;
                    position: absolute;
                    width: 10px;
                    height: 10px;
                    top: -10px;
                    left: 25px;
                    background: #009ef7;
                    border-radius: 50%;
                    box-shadow: 0 70px 0 0 #009ef7;
                }

                .ldio-157102gp7nd > div:nth-child(3) div:after {
                    left: -10px;
                    top: 25px;
                    box-shadow: 70px 0 0 0 #009ef7;
                }

                .ldio-157102gp7nd > div:nth-child(4) {
                    border-color: transparent;
                }

                .ldio-157102gp7nd > div:nth-child(4) div {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    transform: rotate(45deg);
                }

                .ldio-157102gp7nd > div:nth-child(4) div:before,
                .ldio-157102gp7nd > div:nth-child(4) div:after {
                    content: '';
                    display: block;
                    position: absolute;
                    width: 10px;
                    height: 10px;
                    top: -10px;
                    left: 14px;
                    background: #a6d5fa;
                    border-radius: 50%;
                    box-shadow: 0 48px 0 0 #a6d5fa;
                }

                .ldio-157102gp7nd > div:nth-child(4) div:after {
                    left: -10px;
                    top: 14px;
                    box-shadow: 48px 0 0 0 #a6d5fa;
                }

                .loadingio-spinner-double-ring-0hjs6hp5lmk {
                    width: 51px;
                    height: 51px;
                    display: inline-block;
                    overflow: hidden;
                    background: rgba(NaN, NaN, NaN, 0);
                }

                .ldio-157102gp7nd {
                    width: 100%;
                    height: 100%;
                    position: relative;
                    transform: translateZ(0) scale(0.51);
                    backface-visibility: hidden;
                    transform-origin: 0 0; /* see note above */
                }

                .ldio-157102gp7nd div {
                    box-sizing: content-box;
                }

                /* generated by https://loading.io/ */
            `}</style>
        </>
    );
}

export default Loading;
