import { useEffect, useState } from 'react';

export interface IUseAnimationMountParams {
    isOpened: boolean;
    disappearAnimationDuration: number;
}

export interface IUseAnimationMount {
    values: IUseAnimationMountValues;
    handlers: IUseAnimationMountHandlers;
}

export interface IUseAnimationMountValues {
    mounted: boolean;
}

export interface IUseAnimationMountHandlers {}

export default function useAnimationMount(params: IUseAnimationMountParams): IUseAnimationMount {
    const { isOpened, disappearAnimationDuration } = params;

    const [mounted, setMounted] = useState(isOpened);

    useEffect(() => {
        if (isOpened) {
            setMounted(true);
            return;
        }

        setTimeout(() => {
            setMounted(false);
        }, disappearAnimationDuration * 1000);
    }, [isOpened]);

    return {
        values: {
            mounted,
        },
        handlers: {},
    };
}
