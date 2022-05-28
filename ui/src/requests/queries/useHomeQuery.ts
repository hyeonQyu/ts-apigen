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
import { ControllersRes } from '@defines/models';
import { Config } from '@defines/config';

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
    useGenerateCodeMutation: (onMutate: () => void) => UseMutationResult<boolean, AxiosError, Config>;
    useSaveConfigMutation: () => UseMutationResult<boolean, unknown, Config>;
}

export default function useHomeQuery(/*params: IUseHomeQueryParams*/): IUseHomeQuery {
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
            },
        );
    };

    const useGenerateCodeMutation = (onMutate: () => void) => {
        return useMutation((config: Config) => HomeApi.postGenerate({ config }), {
            onMutate,
            onSuccess: (data) => {
                if (data) {
                    return alert('코드 생성이 완료되었습니다.');
                }
            },
            onError: (error: AxiosError) => {
                switch (error.response?.status) {
                    case 500:
                        alert('코드 생성 중 문제가 발생했습니다. 에러 로그를 확인하세요.');
                        break;

                    case 0:
                        alert('코드 생성에 실패했습니다. 프로그램을 다시 실행하세요.');
                        break;
                }
            },
        });
    };

    const useSaveConfigMutation = () => {
        return useMutation((config: Config) => HomeApi.postSave({ config }));
    };

    return {
        useControllersQuery,
        useGenerateCodeMutation,
        useSaveConfigMutation,
    };
}
