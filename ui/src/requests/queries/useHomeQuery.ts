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
        onSuccess: () => void,
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
                onSuccess: () => showToast('Controller를 불러왔어요.', 'success'),
                onError: () => showToast('Controller를 불러오는데 실패했어요. URI를 확인하세요.', 'error'),
            },
        );
    };

    const useGenerateCodeMutation = () => {
        return useMutation((config: Config) => HomeApi.postGenerate({ config }), {
            onSettled: () => {
                setTimeout(() => showToast('설정이 자동 저장되었습니다.', 'info'), 100);
            },
            onSuccess: () => showToast('코드 생성을 완료했어요.', 'success'),
            onError: (error: AxiosError) => {
                switch (error.response?.status) {
                    case 500:
                        showToast('코드 생성 중 문제가 발생했어요. 에러 로그를 확인하세요.', 'error');
                        break;

                    case 0:
                        showToast('코드 생성이 실패했어요. 프로그램을 다시 실행하세요.', 'error');
                        break;
                }
            },
        });
    };

    const useSaveConfigMutation = () => {
        return useMutation((config: Config) => HomeApi.postSave({ config }), {
            onSuccess: () => showToast('설정이 자동 저장되었습니다.', 'info'),
        });
    };

    const useLoadConfigQuery = (isLoaded: boolean, onSuccess: () => void) => {
        return useQuery(['load'], () => HomeApi.getConfig(), {
            enabled: !isLoaded,
            onSuccess,
            refetchOnWindowFocus: false,
            retry: 1,
        });
    };

    return {
        useControllersQuery,
        useGenerateCodeMutation,
        useSaveConfigMutation,
        useLoadConfigQuery,
    };
}
