import { ChangeEventHandler, Dispatch, FocusEventHandler, KeyboardEventHandler, SetStateAction, useEffect, useState } from 'react';
import { PrettierConfig } from '@defines/prettierConfig';
import { HttpApiType } from '@defines/httpApiType';
import { ControllerOptionInfo } from '@defines/controllerOptionInfo';
import { SelectBoxOption } from '@components/common/select-box/defines/selectBoxOption';
import useHomeQuery from '@requests/queries/useHomeQuery';
import { SelectedControllerType } from '@defines/selectedControllerType';
import useInterval from '@hooks/common/useInterval';
import { Config } from '@defines/config';
// import { HomeProps } from '@pages/index';
import useLoad from '@hooks/common/useLoad';
import useToastMessage from '@hooks/common/useToastMessage';

// export interface IUseHomeParams extends HomeProps {}

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
    selectedControllerType: SelectedControllerType;
    httpApiType: HttpApiType;
    httpApiTypeOptions: SelectBoxOption<HttpApiType>[];
    generatedCodePath: string;
    baseRoot: string;
    baseRootSet: Set<string>;
}

export interface IUseHomeHandlers {
    handleClickInitSelectedController: () => void;
    handleClickGenerateCode: () => void;

    setUri: Dispatch<SetStateAction<string>>;
    handleUseApiDocsUriBlur: FocusEventHandler<HTMLInputElement>;
    handleUseApiDocsUriFocus: FocusEventHandler<HTMLInputElement>;

    handleChangeSelectedControllerType: ChangeEventHandler<HTMLInputElement>;

    setPrettierConfig: Dispatch<SetStateAction<PrettierConfig | null>>;

    handleSelectController: (value: string, selected?: boolean) => void;
    handleClickDeleteControllerLabel: (name: string) => void;

    handleSelectHttpApiType: (type: HttpApiType) => void;

    setGeneratedCodePath: Dispatch<SetStateAction<string>>;

    setBaseRoot: Dispatch<SetStateAction<string>>;
    handleBaseRootAddInputKeyPress: KeyboardEventHandler<HTMLInputElement>;
    handleClickDeleteBaseRootLabel: (baseRoot: string) => void;
}

export default function useHome(/*params: IUseHomeParams*/): IUseHome {
    const controllerNamesToControllers = (controllerNames: string[], selectedControllerNames: string[] = []): ControllerOptionInfo[] => {
        const selectedControllerNameSet = new Set(selectedControllerNames);
        return controllerNames.map((name) => ({ name, checked: selectedControllerNameSet.has(name) }));
    };
    const controllersToSelectedControllerNames = (controllers: ControllerOptionInfo[]): string[] =>
        controllers.filter(({ checked }) => checked).map(({ name }) => name);
    const controllersToControllerOptions = (controllers: ControllerOptionInfo[]): SelectBoxOption<string>[] =>
        controllers.map(({ name }) => ({ name, value: name }));

    const getConfig = (): Config => {
        return {
            apiDocsUri: uri,
            requestApi: httpApiType,
            prettierConfig,
            controllerNames: selectedControllerNames,
            baseRootList: Array.from(baseRootSet),
            selectedControllerType,
            generatedCodePath,
        };
    };

    // 저장된 설정과 현재 설정이 같은지 확인
    const isSameAsSavedConfig = (config: Config): boolean => {
        for (const key in config) {
            const property = key as keyof Config;
            const configValue = config[property];
            const savedConfigValue = savedConfig[property];

            if (Array.isArray(configValue) && Array.isArray(savedConfigValue)) {
                if (configValue.length !== savedConfigValue.length) {
                    return false;
                }
                for (let i = 0; i < configValue.length; i++) {
                    if (configValue[i] !== savedConfigValue[i]) {
                        return false;
                    }
                }
            } else if (config[property] !== savedConfig[property]) {
                return false;
            }
        }

        return true;
    };

    // 변경된 설정 사항 저장
    const saveConfig = (): boolean => {
        const { mutate, isError } = saveConfigMutation;
        const config = getConfig();

        if (isSameAsSavedConfig(config)) {
            return isError;
        }

        mutate(config);
        setSavedConfig(config);
        return isError;
    };

    const [isLoaded, setIsLoaded] = useState(false);

    const [uri, setUri] = useState('');
    const [isLoadController, setIsLoadController] = useState(false);

    const [prettierConfig, setPrettierConfig] = useState<PrettierConfig | null>(null);

    const [controllers, setControllers] = useState<ControllerOptionInfo[]>([]);
    const [selectedControllerNames, setSelectedControllerNames] = useState<string[]>(controllersToSelectedControllerNames(controllers));
    const [controllerOptions, setControllerOptions] = useState<SelectBoxOption<string>[]>(controllersToControllerOptions(controllers));

    const [selectedControllerType, setSelectedControllerType] = useState<SelectedControllerType>('INCLUDE');

    const httpApiTypes: Omit<SelectBoxOption<HttpApiType>, 'name'>[] = [{ value: 'fetch', disabled: true }, { value: 'axios' }];
    const [httpApiType, setHttpApiType] = useState<HttpApiType>('axios');

    const [generatedCodePath, setGeneratedCodePath] = useState('');

    const [baseRoot, setBaseRoot] = useState('');
    const [baseRootSet, setBaseRootSet] = useState<Set<string>>(new Set());

    const [savedConfig, setSavedConfig] = useState<Config>(getConfig());

    const { useControllersQuery, useGenerateCodeMutation, useSaveConfigMutation, useLoadConfigQuery } = useHomeQuery();

    const {
        handlers: { showToast },
    } = useToastMessage();

    const controllersQuery = useControllersQuery(uri, isLoadController, () => setIsLoadController(false));
    const generateCodeMutation = useGenerateCodeMutation();
    const saveConfigMutation = useSaveConfigMutation();
    const loadConfigQuery = useLoadConfigQuery(isLoaded, () => setIsLoaded(true));

    const controllerNames = controllersQuery.data?.controllerNames ?? [];

    useLoad(controllersQuery);
    useLoad(generateCodeMutation);

    // 저장된 설정 최초 1회만 불러오기
    useEffect(() => {
        const { data } = loadConfigQuery;
        const config = data?.config ?? getConfig();
        const controllerNamesByUri = data?.controllerNamesByUri ?? [];

        const { apiDocsUri, prettierConfig, controllerNames, selectedControllerType, requestApi, generatedCodePath, baseRootList } = config;

        setUri(apiDocsUri);
        setPrettierConfig(prettierConfig);
        setControllers(controllerNamesToControllers(controllerNamesByUri, controllerNames));
        setSelectedControllerType(selectedControllerType);
        setHttpApiType(requestApi);
        setGeneratedCodePath(generatedCodePath);
        setBaseRootSet(new Set(baseRootList));
    }, [loadConfigQuery.data]);

    // 15초마다 자동저장
    const { intervalId } = useInterval(() => {
        const isError = saveConfig();
        if (isError && intervalId) {
            clearInterval(intervalId);
        }
    }, 15000);

    // Controller 목록 조회 API 호출 후
    useEffect(() => {
        if (controllerNames.length === 0) {
            return;
        }
        setControllers(controllerNamesToControllers(controllerNames));
    }, [controllerNames]);

    // Controller 목록 변경 시 데이터 가공
    useEffect(() => {
        setSelectedControllerNames(controllersToSelectedControllerNames(controllers));
        setControllerOptions(controllersToControllerOptions(controllers));
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

    const handleClickGenerateCode = () => {
        if (!uri) {
            showToast('API docs URI를 입력하세요.', 'warning');
            return;
        }
        generateCodeMutation.mutate(getConfig());
    };

    // API docs URI Focus 및 Blur 이벤트 핸들러
    const handleUseApiDocsUriBlur = () => setIsLoadController(true);
    const handleUseApiDocsUriFocus = () => setIsLoadController(false);

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

    // 선택한 Controller 에 대한 코드 생성 옵션 선택
    const handleChangeSelectedControllerType: ChangeEventHandler<HTMLInputElement> = (e) => {
        setSelectedControllerType(e.target.value as SelectedControllerType);
    };

    // HTTP 통신 방식 선택
    const handleSelectHttpApiType = (type: HttpApiType) => setHttpApiType(type);

    const httpApiTypeOptions: SelectBoxOption<HttpApiType>[] = httpApiTypes.map(({ value, disabled }) => ({
        name: value,
        value,
        disabled,
    }));

    // Base Root 입력
    const handleBaseRootAddInputKeyPress: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === 'Enter') {
            if (!baseRoot) {
                return;
            }

            setBaseRootSet((prev) => {
                prev.add(baseRoot.charAt(baseRoot.length - 1) === '/' ? baseRoot : `${baseRoot}/`);
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
            selectedControllerType,
            httpApiType,
            httpApiTypeOptions,
            generatedCodePath,
            baseRoot,
            baseRootSet,
        },
        handlers: {
            handleClickInitSelectedController,
            handleClickGenerateCode,
            setUri,
            handleUseApiDocsUriBlur,
            handleUseApiDocsUriFocus,
            setPrettierConfig,
            handleSelectController,
            handleChangeSelectedControllerType,
            handleClickDeleteControllerLabel,
            handleSelectHttpApiType,
            setGeneratedCodePath,
            setBaseRoot,
            handleBaseRootAddInputKeyPress,
            handleClickDeleteBaseRootLabel,
        },
    };
}
