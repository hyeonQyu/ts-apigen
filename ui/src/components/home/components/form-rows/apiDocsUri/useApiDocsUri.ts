import { ApiDocsUriRowProps } from '@components/home/components/form-rows/apiDocsUri/apiDocsUriRow';

export interface IUseApiDocsUriParams extends Pick<ApiDocsUriRowProps, 'setIsLoadController'> {}

export interface IUseApiDocsUri {
    values: IUseApiDocsUriValues;
    handlers: IUseApiDocsUriHandlers;
}

export interface IUseApiDocsUriValues {}

export interface IUseApiDocsUriHandlers {
    handleBlur: () => void;
}

export default function useApiDocsUri(params: IUseApiDocsUriParams): IUseApiDocsUri {
    const { setIsLoadController } = params;

    const handleBlur = () => {
        setIsLoadController(true);
    };

    return {
        values: {},
        handlers: {
            handleBlur,
        },
    };
}
