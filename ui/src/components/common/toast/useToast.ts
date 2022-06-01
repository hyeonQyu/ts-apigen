import { ToastProps } from '@components/common/toast/toast';
import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { toastsState } from 'stores/store';
import { ToastType } from '@components/common/toast/defines/toast';
import useInterval from '@hooks/common/useInterval';

export interface IUseToastParams extends ToastProps {}

export interface IUseToast {
    values: IUseToastValues;
    handlers: IUseToastHandlers;
}

export interface IUseToastValues {
    toastRef: MutableRefObject<HTMLDivElement | null>;
    width: number;
    height: number;
    bottom: number;
    initialBottom: number;
    iconPadding: number;
    backgroundColor: string;
}

export interface IUseToastHandlers {}

const toastConfig = {
    width: 400,
    height: 60,
};

const backgroundColorMap: {
    [key in ToastType]: string;
} = {
    success: 'rgb(87, 187, 156)',
    info: 'rgb(107, 170, 191)',
    warning: 'rgb(227, 184, 85)',
    error: 'rgb(208, 71, 70)',
};

export default function useToast(params: IUseToastParams): IUseToast {
    const [toasts, setToasts] = useRecoilState(toastsState);

    const getBottom = (index: number, height: number) => (toasts.length - index - 1) * (height + 14);

    const { isShow, index, type, duration = 3000, id } = params;

    const toastRef = useRef<HTMLDivElement>(null);

    const { width, height } = toastConfig;
    const [bottom, setBottom] = useState(getBottom(index, height));
    const [element, setElement] = useState<HTMLDivElement | null>(null);
    const [isTimeoutStarted, setIsTimeoutStarted] = useState(false);
    const [timeoutId, setTimeoutId] = useState<unknown>(0);

    useEffect(() => {
        setBottom(getBottom(index, height));
    }, [index, toasts]);

    useEffect(() => {
        setElement(toastRef.current);
    }, [toastRef]);

    useEffect(() => {
        if (isShow && !timeoutId) {
            const timeout = setTimeout(() => {
                // 토스트 메시지 시간 만료
                setToasts((prev) =>
                    prev.map((toast) => {
                        return {
                            ...toast,
                            isShow: id === toast.id ? false : toast.isShow,
                        };
                    }),
                );
            }, duration);
            setTimeoutId(timeout);
            setIsTimeoutStarted(() => true);
        }
    }, [isShow, isTimeoutStarted]);

    const { intervalId } = useInterval(
        useCallback(() => {
            const timeoutIntervalId = intervalId as NodeJS.Timeout;

            if (isShow) {
                return;
            }

            if (!element) {
                clearInterval(timeoutIntervalId);
                return;
            }

            if (window.getComputedStyle(element).getPropertyValue('opacity') === '0') {
                clearInterval(timeoutIntervalId);
                setToasts((prev) => prev.filter((toast) => toast.id !== id));
            }
        }, [isShow, element, toasts]),
        200,
    );

    return {
        values: {
            toastRef,
            width,
            height,
            bottom,
            initialBottom: 0,
            iconPadding: 16,
            backgroundColor: backgroundColorMap[type],
        },
        handlers: {},
    };
}
