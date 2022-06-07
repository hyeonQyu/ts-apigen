import { Size, SizeCss, SizeProperty } from '@defines/size';
import { useCallback } from 'react';

export interface IUseCssSizeParams {}

export interface IUseCssSize {
    values: IUseCssSizeValues;
    handlers: IUseCssSizeHandlers;
}

export interface IUseCssSizeValues {}

export interface IUseCssSizeHandlers {
    getSizeCss: (property: SizeProperty, size?: Size) => SizeCss;
}

export default function useCssSize(params: IUseCssSizeParams): IUseCssSize {
    const {} = params;

    const getSizeCss = useCallback((property: SizeProperty, size?: Size): SizeCss => {
        if (size === undefined) {
            return '';
        }

        if (typeof size === 'number') {
            return `${property}: ${size}px;`;
        }

        return `${property}: ${size};`;
    }, []);

    return {
        values: {},
        handlers: {
            getSizeCss,
        },
    };
}
