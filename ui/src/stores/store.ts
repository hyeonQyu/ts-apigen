import { atom } from 'recoil';
import { ToastProps } from '@components/common/toast/toast';

export const loadingCountState = atom<number>({
    key: 'loadingCount',
    default: 0,
});

export const toastsState = atom<Omit<ToastProps, 'index'>[]>({
    key: 'toasts',
    default: [
        {
            isShow: true,
            type: 'success',
            message: 'ㅎㅇㅎㅇ',
        },
        {
            isShow: true,
            type: 'success',
            message: 'ㅎㅇㅎㅇ',
        },
        {
            isShow: true,
            type: 'success',
            message: 'ㅎㅇㅎㅇ',
        },
    ],
});
