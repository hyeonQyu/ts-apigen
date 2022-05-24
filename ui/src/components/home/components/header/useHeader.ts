import { HeaderProps } from '@components/home/components/header/header';
import { useMutation } from 'react-query';
import { Api } from '@requests/apis/api';
import { AxiosError } from 'axios';

export interface IUseHeaderParams extends HeaderProps {}

export interface IUseHeader {
    values: IUseHeaderValues;
    handlers: IUseHeaderHandlers;
}

export interface IUseHeaderValues {}

export interface IUseHeaderHandlers {
    handleClickInitSelectedController: () => void;
    handleClickGenerateCode: () => void;
}

export default function useHeader(params: IUseHeaderParams): IUseHeader {
    const { selectedControllerNames, setControllers, uri, prettierConfig, httpApiType } = params;

    const handleClickInitSelectedController = () => {
        if (selectedControllerNames.length === 0) {
            return;
        }

        if (confirm('선택한 Controller를 모두 초기화하시겠습니까?')) {
            setControllers((prev) => {
                return prev.map(({ name }) => ({ name, checked: false }));
            });
        }
    };

    const generateCode = useMutation(
        () => {
            return Api.postGenerate({
                config: {
                    apiDocsUri: uri,
                    requestApi: httpApiType,
                    prettierConfig,
                    controllerNames: selectedControllerNames,
                },
            });
        },
        {
            onSuccess: (data) => {
                if (data) {
                    alert('코드 생성이 완료되었습니다.');
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
        },
    );

    const handleClickGenerateCode = () => {
        if (!uri) {
            alert('API docs URI를 입력하세요.');
            return;
        }
        generateCode.mutate();
    };

    return {
        values: {},
        handlers: {
            handleClickInitSelectedController,
            handleClickGenerateCode,
        },
    };
}
