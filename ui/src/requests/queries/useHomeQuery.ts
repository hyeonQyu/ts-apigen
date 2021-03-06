import {
    QueryObserverIdleResult,
    QueryObserverLoadingErrorResult,
    QueryObserverLoadingResult,
    QueryObserverRefetchErrorResult,
    QueryObserverSuccessResult,
    useMutation,
    UseMutationResult,
    useQuery,
} from 'react-query';
import { HomeApi } from '@requests/apis/homeApi';
import { AxiosError } from 'axios';
import { ConfigRes, ControllersRes } from '@defines/models';
import { Config } from '@defines/config';
import useToastMessage from '@hooks/common/useToastMessage';

export interface IUseHomeQueryParams {}

export interface IUseHomeQuery {
    useControllersQuery: (
        uri: string,
        isLoadController: boolean,
        onBeforeExecute: () => void,
    ) =>
        | QueryObserverIdleResult<ControllersRes>
        | QueryObserverLoadingErrorResult<ControllersRes>
        | QueryObserverLoadingResult<ControllersRes>
        | QueryObserverRefetchErrorResult<ControllersRes>
        | QueryObserverSuccessResult<ControllersRes>;
    useGenerateCodeMutation: () => UseMutationResult<boolean, AxiosError, Config>;
    useSaveConfigMutation: () => UseMutationResult<boolean, unknown, Config>;
    useLoadConfigQuery: (
        isLoaded: boolean,
        onSettled: () => void,
    ) =>
        | QueryObserverIdleResult<ConfigRes>
        | QueryObserverLoadingErrorResult<ConfigRes>
        | QueryObserverLoadingResult<ConfigRes>
        | QueryObserverRefetchErrorResult<ConfigRes>
        | QueryObserverSuccessResult<ConfigRes>;
}

export default function useHomeQuery(/*params: IUseHomeQueryParams*/): IUseHomeQuery {
    const {
        handlers: { showToast },
    } = useToastMessage();

    const useControllersQuery = (uri: string, isLoadController: boolean, onBeforeExecute: () => void) => {
        return useQuery(
            ['controllers', uri],
            () => {
                onBeforeExecute();
                return HomeApi.getControllers({ apiDocsUri: uri });
            },
            {
                enabled: !!uri && isLoadController,
                staleTime: 300000,
                refetchOnWindowFocus: false,
                retry: 1,
                onSuccess: () => showToast('Controller??? ???????????????.', 'success'),
                onError: () => showToast('Controller??? ??????????????? ???????????????. URI??? ???????????????.', 'error'),
            },
        );
    };

    const useGenerateCodeMutation = () => {
        return useMutation((config: Config) => HomeApi.postGenerate({ config }), {
            onSuccess: () => {
                showToast('?????? ????????? ???????????????.', 'success');
                setTimeout(() => showToast('????????? ?????????????????????.', 'info'), 100);
            },
            onError: (error: AxiosError) => {
                switch (error.response?.status) {
                    case 500:
                        showToast('?????? ?????? ??? ????????? ???????????????. ?????? ????????? ???????????????.', 'error');
                        break;

                    case 0:
                        showToast('?????? ????????? ???????????????. ??????????????? ?????? ???????????????.', 'error');
                        break;
                }
            },
        });
    };

    const useSaveConfigMutation = () => {
        return useMutation((config: Config) => HomeApi.postSave({ config }), {
            onSuccess: () => showToast('????????? ?????? ?????????????????????.', 'info'),
        });
    };

    const useLoadConfigQuery = (isLoaded: boolean, onSettled: () => void) => {
        return useQuery(['load'], () => HomeApi.getConfig(), {
            enabled: !isLoaded,
            onSettled,
            onError: () => showToast('??? ??? ?????? ????????? ???????????????. ??????????????? ?????? ???????????????.', 'error'),
            refetchOnWindowFocus: false,
            retry: 2,
        });
    };

    return {
        useControllersQuery,
        useGenerateCodeMutation,
        useSaveConfigMutation,
        useLoadConfigQuery,
    };
}
