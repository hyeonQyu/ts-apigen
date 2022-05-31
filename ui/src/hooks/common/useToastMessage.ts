import { ToastType } from '@components/common/toast/defines/toast';
import { useSetRecoilState } from 'recoil';
import { toastsState } from 'stores/store';

export interface IUseToastMessageParams {}

export interface IUseToastMessage {
    values: IUseToastMessageValues;
    handlers: IUseToastMessageHandlers;
}

export interface IUseToastMessageValues {}

export interface IUseToastMessageHandlers {
    showToast: (key: string, message: string, type: ToastType, duration?: number) => void;
}

export default function useToastMessage(params: IUseToastMessageParams): IUseToastMessage {
    const {} = params;
    const setToasts = useSetRecoilState(toastsState);

    const showToast = (key: string, message: string, type: ToastType, duration: number = 3000) => {
        setToasts((prev) => [...prev, { id: key, message, type, isShow: true, duration }]);
    };

    return {
        values: {},
        handlers: {
            showToast,
        },
    };
}
