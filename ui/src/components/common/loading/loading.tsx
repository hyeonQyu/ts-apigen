import Lottie from 'lottie-react';
import { lottieLoading } from '@public/assets/lotties/loading';
import { LoadingType } from '@components/common/loading/defines/loadingType';
import { Size } from '@defines/size';
import useCssSize from '@hooks/common/useCssSize';
import useLoading from '@components/common/loading/useLoading';

export interface LoadingProps {
    width?: Size;
    height?: Size;
    type: LoadingType;
    speed?: number;
}

function Loading(props: LoadingProps) {
    const { width = '100%', height, type } = props;

    const {
        values: { lottieRef },
    } = useLoading(props);

    const {
        handlers: { getSizeCss },
    } = useCssSize({});

    return (
        <>
            <div className={'loading'}>
                <Lottie animationData={lottieLoading[type]} loop autoPlay lottieRef={lottieRef} />
            </div>

            <style jsx>{`
                .loading {
                    ${getSizeCss('width', width)}
                    ${getSizeCss('height', height)}
                    display: flex;
                    align-items: center;
                }
            `}</style>
        </>
    );
}

export default Loading;
