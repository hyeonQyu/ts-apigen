import {
    ChangeEventHandler,
    Dispatch,
    FocusEventHandler,
    KeyboardEventHandler,
    SetStateAction,
    useCallback,
    useEffect,
    useState,
} from 'react';
import { PrettierConfig } from '@defines/prettierConfig';
import { HttpApiType } from '@defines/httpApiType';
import { ControllerOptionInfo } from '@defines/controllerOptionInfo';
import { SelectBoxOption } from '@components/common/select-box/defines/selectBoxOption';
import useHomeQuery from '@requests/queries/useHomeQuery';
import { SelectedControllerType } from '@defines/selectedControllerType';
import useInterval from '@hooks/common/useInterval';
import { Config } from '@defines/config';
import useToastMessage from '@hooks/common/useToastMessage';

// export interface IUseHomeParams extends HomeProps {}

export interface IUseHome {
    values: IUseHomeValues;
    handlers: IUseHomeHandlers;
}

export interface IUseHomeValues {
    isLoaded: boolean;
    isControllerLoading: boolean;
    isGeneratingCode: boolean;
    uri: string;
    prettierConfigFileName: string;
    prettierConfig: PrettierConfig;
    controllers: ControllerOptionInfo[];
    selectedControllerNames: string[];
    controllerOptions: SelectBoxOption<string>[];
    selectedControllerType: SelectedControllerType;
    httpApiType: HttpApiType;
    httpApiTypeOptions: SelectBoxOption<HttpApiType>[];
    generatedCodePath: string;
    baseRoot: string;
    baseRootSet: Set<string>;
    isControllerInitDialogOpened: boolean;
    hasLottie: boolean;
}

export interface IUseHomeHandlers {
    handleOpenControllerInitDialog: () => void;
    handleCloseControllerInitDialog: () => void;
    handleInitController: () => void;
    handleClickGenerate: () => void;

    setUri: Dispatch<SetStateAction<string>>;
    handleUseApiDocsUriBlur: FocusEventHandler<HTMLInputElement>;
    handleUseApiDocsUriFocus: FocusEventHandler<HTMLInputElement>;

    handleChangeSelectedControllerType: ChangeEventHandler<HTMLInputElement>;

    handleChangePrettierConfigFileName: (name: string) => void;
    handleChangePrettierConfig: (config: PrettierConfig) => void;

    handleSelectController: (value: string, selected?: boolean) => void;
    handleClickDeleteControllerLabel: (name: string) => void;

    handleSelectHttpApiType: (type: HttpApiType) => void;

    setGeneratedCodePath: Dispatch<SetStateAction<string>>;

    setBaseRoot: Dispatch<SetStateAction<string>>;
    handleBaseRootAddInputKeyPress: KeyboardEventHandler<HTMLInputElement>;
    handleClickDeleteBaseRootLabel: (baseRoot: string) => void;
}

export default function useHome(/*params: IUseHomeParams*/): IUseHome {
    const controllerNamesToControllers = useCallback(
        (controllerNames: string[], selectedControllerNames: string[] = []): ControllerOptionInfo[] => {
            const selectedControllerNameSet = new Set(selectedControllerNames);
            return controllerNames.map((name) => ({ name, checked: selectedControllerNameSet.has(name) }));
        },
        [],
    );
    const controllersToSelectedControllerNames = useCallback((controllers: ControllerOptionInfo[]): string[] => {
        return controllers.filter(({ checked }) => checked).map(({ name }) => name);
    }, []);
    const controllersToControllerOptions = useCallback((controllers: ControllerOptionInfo[]): SelectBoxOption<string>[] => {
        return controllers.map(({ name }) => ({ name, value: name }));
    }, []);

    const isSameControllers = useCallback((controllerNames: string[], controllers: ControllerOptionInfo[]): boolean => {
        if (controllerNames.length !== controllers.length) {
            return false;
        }
        for (let i = 0; i < controllerNames.length; i++) {
            if (controllerNames[i] !== controllers[i].name) {
                return false;
            }
        }
        return true;
    }, []);

    const getConfig = (): Config => {
        return {
            apiDocsUri: uri,
            requestApi: httpApiType,
            prettierConfigFileName,
            prettierConfig,
            controllerNames: selectedControllerNames,
            baseRootList: Array.from(baseRootSet),
            selectedControllerType,
            generatedCodePath,
        };
    };

    // ????????? ????????? ?????? ????????? ????????? ??????
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

    // ????????? ?????? ?????? ??????
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

    const [prettierConfigFileName, setPrettierConfigFileName] = useState<string>('');
    const [prettierConfig, setPrettierConfig] = useState<PrettierConfig>({});

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

    const [isControllerInitDialogOpened, setIsControllerInitDialogOpened] = useState(false);

    const [hasLottie, setHasLottie] = useState(true);

    const { useControllersQuery, useGenerateCodeMutation, useSaveConfigMutation, useLoadConfigQuery } = useHomeQuery();

    const {
        handlers: { showToast },
    } = useToastMessage();

    const controllersQuery = useControllersQuery(uri, isLoadController, () => setIsLoadController(false));
    const generateCodeMutation = useGenerateCodeMutation();
    const saveConfigMutation = useSaveConfigMutation();
    const loadConfigQuery = useLoadConfigQuery(isLoaded, () => setIsLoaded(true));

    const { data: controllersData, isLoading: isControllerLoading } = controllersQuery;
    const controllerNames = controllersData?.controllerNames ?? [];

    const { isLoading: isGeneratingCode } = generateCodeMutation;

    // ????????? ?????? ?????? 1?????? ????????????
    useEffect(() => {
        const { data } = loadConfigQuery;

        const config = data?.config ?? getConfig();
        const controllerNamesByUri = data?.controllerNamesByUri ?? [];

        const {
            apiDocsUri,
            prettierConfigFileName,
            prettierConfig,
            controllerNames,
            selectedControllerType,
            requestApi,
            generatedCodePath,
            baseRootList,
        } = config;

        setUri(apiDocsUri);
        setPrettierConfigFileName(prettierConfigFileName);
        setPrettierConfig(prettierConfig);
        setControllers(controllerNamesToControllers(controllerNamesByUri, controllerNames));
        setSelectedControllerType(selectedControllerType);
        setHttpApiType(requestApi);
        setGeneratedCodePath(generatedCodePath);
        setBaseRootSet(new Set(baseRootList));

        setSavedConfig(config);
    }, [loadConfigQuery.data]);

    // 15????????? ????????????
    const { intervalId } = useInterval(() => {
        const isError = saveConfig();
        if (isError && intervalId) {
            clearInterval(intervalId);
        }
    }, 15000);

    // Controller ?????? ?????? API ?????? ???
    useEffect(() => {
        if (controllerNames.length === 0 || isSameControllers(controllerNames, controllers)) {
            return;
        }
        setControllers(controllerNamesToControllers(controllerNames));
    }, [controllerNames]);

    // Controller ?????? ?????? ??? ????????? ??????
    useEffect(() => {
        setSelectedControllerNames(controllersToSelectedControllerNames(controllers));
        setControllerOptions(controllersToControllerOptions(controllers));
    }, [controllers]);

    useEffect(() => {
        const showLottieByWindowWidth = () => {
            if (hasLottie && window.innerWidth < 1180) {
                setHasLottie(false);
            } else if (!hasLottie && window.innerWidth > 1180) {
                setHasLottie(true);
            }
        };
        showLottieByWindowWidth();

        window.addEventListener('resize', showLottieByWindowWidth);
        return () => window.removeEventListener('resize', showLottieByWindowWidth);
    }, [hasLottie]);

    // Controller ?????? ????????? ?????? ??????
    const handleOpenControllerInitDialog = useCallback(() => {
        setIsControllerInitDialogOpened(true);
    }, [selectedControllerNames]);

    // Controller ?????? ????????? ?????? ??????
    const handleCloseControllerInitDialog = useCallback(() => {
        setIsControllerInitDialogOpened(false);
    }, []);

    // Controller ?????? ?????????
    const handleInitController = useCallback(() => {
        setControllers((prev) => {
            return prev.map(({ name }) => ({ name, checked: false }));
        });
        setIsControllerInitDialogOpened(false);
        showToast('Controller??? ?????? ?????? ?????? ???????????????.', 'info');
    }, [controllers]);

    const handleClickGenerate = () => {
        if (isGeneratingCode) {
            return;
        }
        if (!uri) {
            showToast('API docs URI??? ???????????????.', 'warning');
            return;
        }
        if (!generatedCodePath) {
            showToast('?????? ?????? ????????? ???????????????.', 'warning');
            return;
        }
        generateCodeMutation.mutate(getConfig());
    };

    // prettier ?????? ??????
    const handleChangePrettierConfigFileName = useCallback((name: string) => setPrettierConfigFileName(name), []);
    const handleChangePrettierConfig = useCallback((config: PrettierConfig) => setPrettierConfig(config), []);

    // API docs URI Focus ??? Blur ????????? ?????????
    const handleUseApiDocsUriBlur = () => setIsLoadController(true);
    const handleUseApiDocsUriFocus = () => setIsLoadController(false);

    // ???????????? ??????
    const handleSelectController = useCallback(
        (value: string, selected: boolean = true) => {
            setControllers(
                controllers.map(({ name, checked }) => {
                    return {
                        name,
                        checked: name === value ? selected : checked,
                    };
                }),
            );
        },
        [controllers],
    );

    // ????????? Controller ??? ?????? ?????? ?????? ?????? ??????
    const handleChangeSelectedControllerType: ChangeEventHandler<HTMLInputElement> = (e) => {
        setSelectedControllerType(e.target.value as SelectedControllerType);
    };

    // HTTP ?????? ?????? ??????
    const handleSelectHttpApiType = (type: HttpApiType) => setHttpApiType(type);

    const httpApiTypeOptions: SelectBoxOption<HttpApiType>[] = httpApiTypes.map(({ value, disabled }) => ({
        name: value,
        value,
        disabled,
    }));

    // Base Root ??????
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

    // ???????????? ????????? ??????
    const handleClickDeleteControllerLabel = (name: string) => {
        setControllers((prev) => {
            return prev.map((controller) => {
                return name === controller.name ? { name: controller.name, checked: false } : controller;
            });
        });
    };

    // Base Root ????????? ??????
    const handleClickDeleteBaseRootLabel = (baseRoot: string) => {
        setBaseRootSet((prev) => {
            prev.delete(baseRoot);
            return new Set(prev);
        });
    };

    return {
        values: {
            isLoaded,
            isControllerLoading,
            isGeneratingCode,
            uri,
            prettierConfigFileName,
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
            isControllerInitDialogOpened,
            hasLottie,
        },
        handlers: {
            handleOpenControllerInitDialog,
            handleCloseControllerInitDialog,
            handleInitController,
            handleClickGenerate,
            setUri,
            handleUseApiDocsUriBlur,
            handleUseApiDocsUriFocus,
            handleChangePrettierConfigFileName,
            handleChangePrettierConfig,
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
