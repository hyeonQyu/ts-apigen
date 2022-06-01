import { atom } from 'recoil';
import { ToastProps } from '@components/common/toast/toast';

export const loadingCountState = atom<number>({
    key: 'loadingCount',
    default: 0,
});

export const toastsState = atom<Omit<ToastProps, 'index'>[]>({
    key: 'toasts',
    default: [],
});

export const lastToastSnState = atom<number>({
    key: 'toastSn',
    default: 0,
});
