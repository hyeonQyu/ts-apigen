import { Dispatch, FocusEventHandler, KeyboardEventHandler, SetStateAction, useEffect, useState } from 'react';
import { PrettierConfig } from '@defines/prettierConfig';
import { HttpApiType } from '@defines/httpApiType';
import { Api } from '@requests/apis/api';
import { useMutation, useQuery } from 'react-query';
import { ControllerOptionInfo } from '@defines/controllerOptionInfo';
import { AxiosError } from 'axios';
import { SelectBoxOption } from '@defines/selectBoxOption';

export interface IUseHomeParams {}

export interface IUseHome {
    values: IUseHomeValues;
    handlers: IUseHomeHandlers;
}

export interface IUseHomeValues {
    uri: string;
    prettierConfig: PrettierConfig | null;
    controllers: ControllerOptionInfo[];
    selectedControllerNames: string[];
    controllerOptions: SelectBoxOption<string>[];
    httpApiType: HttpApiType;
    httpApiTypeOptions: SelectBoxOption<HttpApiType>[];
    baseRoot: string;
    baseRootSet: Set<string>;
}

export interface IUseHomeHandlers {
    handleClickInitSelectedController: () => void;
    handleClickGenerateCode: () => void;

    setUri: Dispatch<SetStateAction<string>>;
    handleUseApiDocsUriBlur: FocusEventHandler<HTMLInputElement>;
    handleUseAPiDocsUriFocus: FocusEventHandler<HTMLInputElement>;

    setPrettierConfig: Dispatch<SetStateAction<PrettierConfig | null>>;

    handleSelectController: (value: string, selected?: boolean) => void;
    handleClickDeleteControllerLabel: (name: string) => void;

    handleSelectHttpApiType: (type: HttpApiType) => void;

    setBaseRoot: Dispatch<SetStateAction<string>>;
    handleBaseRootAddInputKeyPress: KeyboardEventHandler<HTMLInputElement>;
    handleClickDeleteBaseRootLabel: (baseRoot: string) => void;
}

export default function useHome(/*params: IUseHomeParams*/): IUseHome {
    // const {} = params;
    const [uri, setUri] = useState('');
    const [isLoadController, setIsLoadController] = useState(false);

    const [prettierConfig, setPrettierConfig] = useState<PrettierConfig | null>(null);

    const [controllers, setControllers] = useState<ControllerOptionInfo[]>([]);
    const [selectedControllerNames, setSelectedControllerNames] = useState<string[]>([]);
    const [controllerOptions, setControllerOptions] = useState<SelectBoxOption<string>[]>([]);

    const httpApiTypes: HttpApiType[] = ['fetch', 'axios'];
    const [httpApiType, setHttpApiType] = useState<HttpApiType>('axios');

    const [baseRoot, setBaseRoot] = useState('');
    const [baseRootSet, setBaseRootSet] = useState<Set<string>>(new Set());

    const controllerNamesToControllers: () => ControllerOptionInfo[] = () => controllerNames.map((name) => ({ name, checked: false }));
    const controllersToSelectedControllerNames: () => string[] = () => controllers.filter(({ checked }) => checked).map(({ name }) => name);
    const controllersToControllerOptions: () => SelectBoxOption<string>[] = () => controllers.map(({ name }) => ({ name, value: name }));

    const { data } = useQuery(
        ['controllers', uri],
        () => {
            setIsLoadController(false);
            return Api.getControllers({ docsUri: uri });
        },
        {
            enabled: !!uri && isLoadController,
            staleTime: 300000,
            refetchOnWindowFocus: false,
        },
    );
    const controllerNames = data?.controllerNames ?? [];

    useEffect(() => {
        if (controllerNames.length === 0) {
            return;
        }
        setControllers(controllerNamesToControllers());
    }, [controllerNames]);

    useEffect(() => {
        setSelectedControllerNames(controllersToSelectedControllerNames());
        setControllerOptions(controllersToControllerOptions());
    }, [controllers]);

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

    // API docs URI Focus 및 Blur 이벤트 핸들러
    const handleUseApiDocsUriBlur = () => setIsLoadController(true);
    const handleUseAPiDocsUriFocus = () => setIsLoadController(false);

    // 컨트롤러 선택
    const handleSelectController = (value: string, selected: boolean = true) => {
        setControllers(
            controllers.map(({ name, checked }) => {
                return {
                    name,
                    checked: name === value ? selected : checked,
                };
            }),
        );
    };

    // HTTP 통신 방식 선택
    const handleSelectHttpApiType = (type: HttpApiType) => setHttpApiType(type);

    const httpApiTypeOptions: SelectBoxOption<HttpApiType>[] = httpApiTypes.map((type) => ({ name: type, value: type }));

    // Base Root 입력
    const handleBaseRootAddInputKeyPress: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === 'Enter') {
            if (!baseRoot) {
                return;
            }

            setBaseRootSet((prev) => {
                prev.add(baseRoot);
                return new Set(prev);
            });

            setBaseRoot('');
        }
    };

    // 컨트롤러 레이블 삭제
    const handleClickDeleteControllerLabel = (name: string) => {
        setControllers((prev) => {
            return prev.map((controller) => {
                return name === controller.name ? { name: controller.name, checked: false } : controller;
            });
        });
    };

    // Base Root 레이블 삭제
    const handleClickDeleteBaseRootLabel = (baseRoot: string) => {
        setBaseRootSet((prev) => {
            prev.delete(baseRoot);
            return new Set(prev);
        });
    };

    return {
        values: {
            uri,
            prettierConfig,
            controllers,
            selectedControllerNames,
            controllerOptions,
            httpApiType,
            httpApiTypeOptions,
            baseRoot,
            baseRootSet,
        },
        handlers: {
            handleClickInitSelectedController,
            handleClickGenerateCode,
            setUri,
            handleUseApiDocsUriBlur,
            handleUseAPiDocsUriFocus,
            setPrettierConfig,
            handleSelectController,
            handleClickDeleteControllerLabel,
            handleSelectHttpApiType,
            setBaseRoot,
            handleBaseRootAddInputKeyPress,
            handleClickDeleteBaseRootLabel,
        },
    };
}
