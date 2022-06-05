import Lottie from 'lottie-react';
import { lottieLoading } from '@public/assets/lotties/loading';

export interface LoadingProps {
    width?: number | string;
}

function Loading(props: LoadingProps) {
    const { width = '100%' } = props;

    return (
        <>
            <div className={'loading'}>
                <Lottie animationData={lottieLoading} loop autoPlay />
            </div>

            <style jsx>{`
                .loading {
                    width: ${typeof width === 'number' ? `${width}px` : width};
                }
            `}</style>
        </>
    );
}

export default Loading;
