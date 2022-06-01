import { ToastProps } from '@components/common/toast/toast';

export interface ToastInfo {
    lastSn: number;
    toastProps: Omit<ToastProps, 'index'>[];
}
