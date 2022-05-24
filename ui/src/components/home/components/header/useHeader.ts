import { HeaderProps } from '@components/home/components/header/header';
import { useMutation } from 'react-query';
import { Api } from '@requests/apis/api';

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

    const generateCode = useMutation(() => {
        return Api.postGenerate({
            config: {
                apiDocsUri: uri,
                requestApi: httpApiType,
                prettierConfig,
                controllerNames: selectedControllerNames,
            },
        });
    });

    const handleClickGenerateCode = () => {
        const { data, mutate, isSuccess } = generateCode;
        mutate();
        if (isSuccess && data) {
            alert('코드 생성이 완료되었습니다.');
        }
    };

    return {
        values: {},
        handlers: {
            handleClickInitSelectedController,
            handleClickGenerateCode,
        },
    };
}
