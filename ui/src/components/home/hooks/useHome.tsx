import { useState } from 'react';
import { PrettierConfig } from '@defines/prettierConfig';
import { HttpApiType } from '@defines/httpApiType';
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
    httpApiType: HttpApiType;
}

export interface IUseHomeHandlers {
    setUri: (uri: string) => void;
    setPrettierConfig: (prettierConfig: PrettierConfig | null) => void;
    setControllers: (controllers: ControllerOptionInfo[]) => void;
    setHttpApiType: (httpApiType: HttpApiType) => void;
}

export default function useHome(/*params: IUseHomeParams*/): IUseHome {
    // const {} = params;
    const [uri, setUri] = useState('');
    const [prettierConfig, setPrettierConfig] = useState<PrettierConfig | null>(null);
    const [controllers, setControllers] = useState<ControllerOptionInfo[]>([]);
    const [httpApiType, setHttpApiType] = useState<HttpApiType>('axios');

    return {
        values: {
            uri,
            prettierConfig,
            controllers,
            httpApiType,
        },
        handlers: {
            setUri,
            setPrettierConfig,
            setControllers,
            setHttpApiType,
        },
    };
}
