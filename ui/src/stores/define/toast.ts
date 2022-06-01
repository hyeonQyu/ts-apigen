import { ToastProps } from '@components/common/toast/toast';

export interface ToastState extends Omit<ToastProps, 'index'> {}

export interface ToastInfoState {
    lastSn: number;
    toasts: ToastState[];
}
