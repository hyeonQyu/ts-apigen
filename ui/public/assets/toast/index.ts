import { ToastType } from '@components/common/toast/defines/toast';

export const assetToast: {
    [key in ToastType]?: string;
} = (() => {
    const types: ToastType[] = ['success', 'info', 'warning', 'error'];
    return types.reduce((acc, type) => ({ ...acc, [type]: require(`./${type}.png`).default.src }), {});
})();
