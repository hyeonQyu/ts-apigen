import { ToastProps } from '@components/common/toast/toast';
import { MutableRefObject, useEffect, useRef, useState } from 'react';

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
}

export interface IUseToastHandlers {}

const toastConfig = {
    width: 400,
    height: 40,
};

export default function useToast(params: IUseToastParams): IUseToast {
    const getBottom = (index: number, height: number) => index * (height + 14);

    const { isShow, index } = params;
    const toastRef = useRef<HTMLDivElement>(null);
    const { width, height } = toastConfig;
    const [bottom, setBottom] = useState(getBottom(index, height));

    useEffect(() => {
        setBottom(getBottom(index, height));
    }, [index]);

    return {
        values: {
            toastRef,
            width,
            height,
            bottom,
            initialBottom: 0,
        },
        handlers: {},
    };
}
