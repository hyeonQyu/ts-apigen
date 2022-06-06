import Lottie from 'lottie-react';
import { lottieLoading } from '@public/assets/lotties/loading';
import { LoadingType } from '@components/common/loading/defines/loadingType';
import { Size } from '@defines/size';
import useCssSize from '@hooks/common/useCssSize';

export interface LoadingProps {
    width?: Size;
    height?: Size;
    type: LoadingType;
}

function Loading(props: LoadingProps) {
    const { width = '100%', height, type } = props;
    const {
        handlers: { getSizeCss },
    } = useCssSize({});

    return (
        <>
            <div className={'loading'}>
                <Lottie animationData={lottieLoading[type]} loop autoPlay />
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
