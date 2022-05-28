import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { loadingCountState } from 'stores/store';

export interface IUseLoadParams {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
}

export interface IUseLoad {
    values: IUseLoadValues;
    handlers: IUseLoadHandlers;
}

export interface IUseLoadValues {}

export interface IUseLoadHandlers {}

export default function useLoad(params: IUseLoadParams): IUseLoad {
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
