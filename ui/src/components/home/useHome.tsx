import { useEffect, useState } from 'react';
import { PrettierConfig } from '@defines/prettierConfig';
import { HttpApiType } from '@defines/httpApiType';
import { Api } from '@requests/apis/api';
import { useQuery } from 'react-query';

export interface IUseHomeParams {}

export interface IUseHome {
    values: IUseHomeValues;
    handlers: IUseHomeHandlers;
}

export interface IUseHomeValues {
    uri: string;
    prettierConfig: PrettierConfig | null;
    controllerNames: string[];
    httpApiType: HttpApiType;
}

export interface IUseHomeHandlers {
    setUri: (uri: string) => void;
    setIsLoadController: (isLoad: boolean) => void;
    setPrettierConfig: (prettierConfig: PrettierConfig | null) => void;
    setHttpApiType: (httpApiType: HttpApiType) => void;
}

export default function useHome(/*params: IUseHomeParams*/): IUseHome {
    // const {} = params;
    const [uri, setUri] = useState('');
    const [isLoadController, setIsLoadController] = useState(false);
    const [prettierConfig, setPrettierConfig] = useState<PrettierConfig | null>(null);
    const [httpApiType, setHttpApiType] = useState<HttpApiType>('axios');

    const { data } = useQuery(
        'controllers',
        () => {
            setIsLoadController(false);
            return Api.getControllers({ docsUri: uri });
        },
        {
            enabled: isLoadController,
        },
    );
    const controllerNames = data?.controllerNames ?? [];

    useEffect(() => {
        (async () => {
            const { controllerNames } = await Api.getControllers({ docsUri: 'http://localhost:8080/v2/api-docs' });
            console.log('controllerNames', controllerNames);
        })();
    }, []);

    return {
        values: {
            uri,
            prettierConfig,
            controllerNames,
            httpApiType,
        },
        handlers: {
            setUri,
            setIsLoadController,
            setPrettierConfig,
            setHttpApiType,
        },
    };
}
