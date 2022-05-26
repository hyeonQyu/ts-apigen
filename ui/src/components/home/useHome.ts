import { Dispatch, FocusEventHandler, KeyboardEventHandler, SetStateAction, useEffect, useState } from 'react';
import { PrettierConfig } from '@defines/prettierConfig';
import { HttpApiType } from '@defines/httpApiType';
import { ControllerOptionInfo } from '@defines/controllerOptionInfo';
import { SelectBoxOption } from '@defines/selectBoxOption';
import useHomeQuery from '@requests/queries/useHomeQuery';

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

    const httpApiTypes: Omit<SelectBoxOption<HttpApiType>, 'name'>[] = [{ value: 'fetch', disabled: true }, { value: 'axios' }];
    const [httpApiType, setHttpApiType] = useState<HttpApiType>('axios');

    const [baseRoot, setBaseRoot] = useState('');
    const [baseRootSet, setBaseRootSet] = useState<Set<string>>(new Set());

    const { useControllersQuery, useGenerateCodeMutation } = useHomeQuery();

    const controllersQuery = useControllersQuery(uri, isLoadController, () => setIsLoadController(false));
    const generateCodeMutation = useGenerateCodeMutation({
        apiDocsUri: uri,
        requestApi: httpApiType,
        prettierConfig,
        controllerNames: selectedControllerNames,
        baseRootList: Array.from(baseRootSet),
    });

    const controllerNames = controllersQuery.data?.controllerNames ?? [];

    const controllerNamesToControllers: () => ControllerOptionInfo[] = () => controllerNames.map((name) => ({ name, checked: false }));
    const controllersToSelectedControllerNames: () => string[] = () => controllers.filter(({ checked }) => checked).map(({ name }) => name);
    const controllersToControllerOptions: () => SelectBoxOption<string>[] = () => controllers.map(({ name }) => ({ name, value: name }));

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

    const handleClickGenerateCode = () => {
        if (!uri) {
            alert('API docs URI를 입력하세요.');
            return;
        }
        generateCodeMutation.mutate();
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
