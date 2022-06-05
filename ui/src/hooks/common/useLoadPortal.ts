import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { loadingCountState } from 'stores/store';

export interface IUseLoadPortalParams {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
}

export interface IUseLoadPortal {
    values: IUseLoadPortalValues;
    handlers: IUseLoadPortalHandlers;
}

export interface IUseLoadPortalValues {}

export interface IUseLoadPortalHandlers {}

export default function useLoadPortal(params: IUseLoadPortalParams): IUseLoadPortal {
    const { isLoading, isSuccess, isError } = params;
    const setLoadingCount = useSetRecoilState(loadingCountState);

    useEffect(() => {
        if (isLoading) {
            setLoadingCount((prev) => prev + 1);
        }
        if (isSuccess || isError) {
            setLoadingCount((prev) => Math.max(prev - 1, 0));
        }
    }, [isLoading, isSuccess, isError]);

    return {
        values: {},
        handlers: {},
    };
}
