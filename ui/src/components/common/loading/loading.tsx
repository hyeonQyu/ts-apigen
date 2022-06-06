import Lottie from 'lottie-react';
import { lottieLoading } from '@public/assets/lotties/loading';
import { LoadingType } from '@components/common/loading/defines/loadingType';

export interface LoadingProps {
    width?: number | string;
    height?: number | string;
    type: LoadingType;
}

function Loading(props: LoadingProps) {
    const { width = '100%', height, type } = props;

    return (
        <>
            <div className={'loading'}>
                <Lottie animationData={lottieLoading[type]} loop autoPlay />
            </div>

            <style jsx>{`
                .loading {
                    width: ${typeof width === 'number' ? `${width}px` : width};
                    ${height ? `height: ${typeof height === 'number' ? `${height}px` : height}` : ''};
                    display: flex;
                    align-items: center;
                }
            `}</style>
        </>
    );
}

export default Loading;
