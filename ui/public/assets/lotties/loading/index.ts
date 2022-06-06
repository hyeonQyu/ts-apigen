import { LoadingType } from '@components/common/loading/defines/loadingType';

export const lottieLoading: {
    [key in LoadingType]?: any;
} = (() => {
    const types: LoadingType[] = ['all', 'controller', 'generate'];
    return types.reduce((acc, type) => ({ ...acc, [type]: require(`./${type}.json`) }), {});
})();
