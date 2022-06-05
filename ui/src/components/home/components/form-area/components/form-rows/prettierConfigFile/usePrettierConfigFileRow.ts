import { PrettierConfig } from '@defines/prettierConfig';
import { useEffect, useState } from 'react';
import { KeyValuePair } from '@defines/keyValuePair';

export interface IUsePrettierConfigFileRowParams {
    prettierConfig: PrettierConfig;
}

export interface IUsePrettierConfigFileRow {
    values: IUsePrettierConfigFileRowValues;
    handlers: IUsePrettierConfigFileRowHandlers;
}

export interface IUsePrettierConfigFileRowValues {
    isPrettierConfigTooltipShow: boolean;
    prettierConfigOptions: KeyValuePair<string, string>[];
}

export interface IUsePrettierConfigFileRowHandlers {
    handleShowPrettierConfigTooltip: () => void;
    handleHidePrettierConfigTooltip: () => void;
}

export default function usePrettierConfigFileRow(params: IUsePrettierConfigFileRowParams): IUsePrettierConfigFileRow {
    const { prettierConfig } = params;
    const [isPrettierConfigTooltipShow, setIsPrettierConfigTooltipShow] = useState(false);
    const [prettierConfigOptions, setPrettierConfigOptions] = useState<KeyValuePair<string, string>[]>([]);

    useEffect(() => {
        setPrettierConfigOptions(() => {
            const prettierConfigString: string = JSON.stringify(prettierConfig).replace(/"/g, '');
            const options = prettierConfigString.substring(1, prettierConfigString.length - 1).split(',');
            return options.map((option) => {
                const tmp = option.split(':');
                const [key, value] = tmp;
                return {
                    key,
                    value,
                };
            });
        });
    }, [prettierConfig]);

    const handleShowPrettierConfigTooltip = () => setIsPrettierConfigTooltipShow(true);
    const handleHidePrettierConfigTooltip = () => setIsPrettierConfigTooltipShow(false);

    return {
        values: {
            isPrettierConfigTooltipShow,
            prettierConfigOptions,
        },
        handlers: {
            handleShowPrettierConfigTooltip,
            handleHidePrettierConfigTooltip,
        },
    };
}
