import { ModalProps } from '@components/common/modal/modal';
import useAnimationMount from '@hooks/common/useAnimationMount';

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
    const {
        values: { mounted },
    } = useAnimationMount({ isOpened, disappearAnimationDuration });

    return {
        values: {
            appearAnimationDuration,
            disappearAnimationDuration,
            mounted,
        },
        handlers: {},
    };
}
