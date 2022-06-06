import { atom, selector } from 'recoil';
import { ToastInfoState, ToastState } from 'stores/define/toast';

export const toastsState = atom<ToastState[]>({
    key: 'toasts',
    default: [],
});

export const lastToastSnState = atom<number>({
    key: 'toastSn',
    default: 0,
});

export const toastInfoState = selector<ToastInfoState>({
    key: 'toastInfo',
    set: ({ set }, newValue) => {
        const { lastSn, toasts } = newValue as ToastInfoState;
        set(toastsState, toasts);
        set(lastToastSnState, lastSn);
    },
    get: ({ get }) => {
        return {
            lastSn: get(lastToastSnState),
            toasts: get(toastsState),
        };
    },
});
