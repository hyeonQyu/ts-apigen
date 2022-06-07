import { LoadingProps } from '@components/common/loading/loading';
import { useEffect, useRef } from 'react';
import { LottieRef, LottieRefCurrentProps } from 'lottie-react';

export interface IUseLoadingParams extends LoadingProps {}

export interface IUseLoading {
    values: IUseLoadingValues;
    handlers: IUseLoadingHandlers;
}

export interface IUseLoadingValues {
    lottieRef: LottieRef;
}

export interface IUseLoadingHandlers {}

export default function useLoading(params: IUseLoadingParams): IUseLoading {
    const { speed = 1 } = params;
    const lottieRef = useRef<LottieRefCurrentProps | null>(null);

    useEffect(() => {
        const element = lottieRef?.current;
        if (!element) {
            return;
        }

        element.setSpeed(speed);
    }, [lottieRef, speed]);

    return {
        values: {
            lottieRef,
        },
        handlers: {},
    };
}
