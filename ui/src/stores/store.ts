import { atom } from 'recoil';
import { ToastProps } from '@components/common/toast/toast';

export const loadingCountState = atom<number>({
    key: 'loadingCount',
    default: 0,
});

export const toastsState = atom<Omit<ToastProps, 'index'>[]>({
    key: 'toasts',
    default: [],
    // default: [
    //     {
    //         isShow: true,
    //         type: 'success',
    //         message: '설정이 저장되었습니다.',
    //         duration: 3000,
    //         id: 1,
    //     },
    //     // {
    //     //     isShow: true,
    //     //     type: 'info',
    //     //     message: '2',
    //     //     duration: 3000,
    //     //     id: '2',
    //     // },
    //     // {
    //     //     isShow: true,
    //     //     type: 'success',
    //     //     message: '3',
    //     //     duration: 3000,
    //     //     id: '3',
    //     // },
    // ],
});

export const lastToastSnState = atom<number>({
    key: 'toastSn',
    default: 0,
});

// export const toastInfoState = atom<ToastInfo>({
//     key: 'toastInfo',
//     default: {
//         lastSn: 0,
//         toastProps: [],
//     },
// });
