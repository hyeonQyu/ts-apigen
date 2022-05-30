import { ToastProps } from '@components/common/toast/toast';
import { MutableRefObject, useEffect, useRef } from 'react';

export interface IUseToastParams extends ToastProps {}

export interface IUseToast {
    values: IUseToastValues;
    handlers: IUseToastHandlers;
}

export interface IUseToastValues {
    toastRef: MutableRefObject<HTMLDivElement | null>;
}

export interface IUseToastHandlers {}

export default function useToast(params: IUseToastParams): IUseToast {
    const { isShow } = params;
    const toastRef = useRef<HTMLDivElement>(null);

    useEffect(() => {});

    return {
        values: {
            toastRef,
        },
        handlers: {},
    };
}
