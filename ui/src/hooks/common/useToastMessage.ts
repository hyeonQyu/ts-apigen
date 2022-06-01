import { ToastType } from '@components/common/toast/defines/toast';
import { useRecoilState } from 'recoil';
import { lastToastSnState, toastsState } from 'stores/store';
import { useCallback, useEffect, useState } from 'react';

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
    const [toasts, setToasts] = useRecoilState(toastsState);
    const [lastToastSn, setLastToastSn] = useRecoilState(lastToastSnState);
    const [addToastFlag, setAddToastFlag] = useState(false);

    useEffect(() => {
        const click = () => showToast('안녕하세요', 'warning');
        window.addEventListener('click', click);
        return () => window.removeEventListener('click', click);
    }, [lastToastSn, toasts]);

    const showToast = useCallback(
        (message: string, type: ToastType, duration: number = 3000) => {
            setToasts((prev) => [
                ...prev,
                {
                    message,
                    type,
                    duration,
                    isShow: true,
                    id: lastToastSn,
                },
            ]);
            setAddToastFlag((prev) => !prev);
        },
        [lastToastSn, toasts],
    );

    useEffect(() => {
        setLastToastSn((prev) => prev + 1);
    }, [addToastFlag]);

    return {
        values: {},
        handlers: {
            showToast,
        },
    };
}
