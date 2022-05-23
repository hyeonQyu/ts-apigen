import { useEffect, useState } from 'react';
import { PrettierConfig } from '@defines/prettierConfig';
import { HttpApiType } from '@defines/httpApiType';
import { Api } from '@requests/apis/api';
import { useQuery } from 'react-query';
import { ControllerOptionInfo } from '@defines/controllerOptionInfo';

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
    httpApiType: HttpApiType;
}

export interface IUseHomeHandlers {
    setUri: (uri: string) => void;
    setIsLoadController: (isLoad: boolean) => void;
    setPrettierConfig: (prettierConfig: PrettierConfig | null) => void;
    setControllers: (controllers: ControllerOptionInfo[]) => void;
    setHttpApiType: (httpApiType: HttpApiType) => void;
}

export default function useHome(/*params: IUseHomeParams*/): IUseHome {
    // const {} = params;
    const [uri, setUri] = useState('');
    const [isLoadController, setIsLoadController] = useState(false);
    const [prettierConfig, setPrettierConfig] = useState<PrettierConfig | null>(null);
    const [controllers, setControllers] = useState<ControllerOptionInfo[]>([]);
    const [selectedControllerNames, setSelectedControllerNames] = useState<string[]>([]);
    const [httpApiType, setHttpApiType] = useState<HttpApiType>('axios');

    const controllerNamesToControllers: () => ControllerOptionInfo[] = () => controllerNames.map((name) => ({ name, checked: false }));
    const controllersToSelectedControllerNames: () => string[] = () => controllers.filter(({ checked }) => checked).map(({ name }) => name);

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
    }, [controllers]);

    return {
        values: {
            uri,
            prettierConfig,
            controllers,
            selectedControllerNames,
            httpApiType,
        },
        handlers: {
            setUri,
            setIsLoadController,
            setPrettierConfig,
            setControllers,
            setHttpApiType,
        },
    };
}
