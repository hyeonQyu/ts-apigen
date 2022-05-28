import { atom } from 'recoil';

export const loadingCountState = atom<number>({
    key: 'loadingCount',
    default: 0,
});
