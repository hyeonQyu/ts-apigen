import { useHomeContext } from '@components/home/context/homeContext';
import Lottie from 'lottie-react';
import { lottieMain } from '@public/assets/lotties/main';

function LottieArea() {
    const {
        values: { hasLottie },
    } = useHomeContext();

    return (
        <>
            {hasLottie && (
                <div className={'lottie-area'}>
                    <Lottie animationData={lottieMain} loop autoPlay />
                </div>
            )}

            <style jsx>{`
                .lottie-area {
                    width: 480px;
                    display: flex;
                    align-items: center;
                }
            `}</style>
        </>
    );
}

export default LottieArea;
