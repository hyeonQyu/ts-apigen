import { useEffect, useState } from 'react';
import { ModalProps } from '@components/common/modal/modal';

export interface IUseModalParams extends Pick<ModalProps, 'isOpened'> {}

export interface IUseModal {
    values: IUseModalValues;
    handlers: IUseModalHandlers;
}

export interface IUseModalValues {
    appearAnimationDuration: number;
    disappearAnimationDuration: number;
    mounted: boolean;
}

export interface IUseModalHandlers {}

export default function useModal(params: IUseModalParams): IUseModal {
    const appearAnimationDuration = 0.6;
    const disappearAnimationDuration = 0.2;

    const { isOpened = false } = params;
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
            appearAnimationDuration,
            disappearAnimationDuration,
            mounted,
        },
        handlers: {},
    };
}
