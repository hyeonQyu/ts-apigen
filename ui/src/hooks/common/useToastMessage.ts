import { ToastType } from '@components/common/toast/defines/toast';
import { useRecoilState } from 'recoil';
import { toastInfoState } from 'stores/store';
import { useCallback } from 'react';

export interface IUseToastMessageParams {}

export interface IUseToastMessage {
    values: IUseToastMessageValues;
    handlers: IUseToastMessageHandlers;
}

export interface IUseToastMessageValues {}

export interface IUseToastMessageHandlers {
    showToast: (message: string, type: ToastType, duration?: number) => void;
}

export default function useToastMessage(/*params: IUseToastMessageParams*/): IUseToastMessage {
    // const {} = params;
    const [toastInfo, setToastInfo] = useRecoilState(toastInfoState);

    const showToast = useCallback(
        (message: string, type: ToastType, duration: number = 3000) => {
            setToastInfo((prev) => {
                return {
                    lastSn: prev.lastSn + 1,
                    toasts: [...prev.toasts, { message, type, duration, isShow: true, id: prev.lastSn }],
                };
            });
        },
        [toastInfo],
    );

    return {
        values: {},
        handlers: {
            showToast,
        },
    };
}
