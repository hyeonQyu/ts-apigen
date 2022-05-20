import { SelectBoxOption } from '@defines/SelectBoxOption';
import { HttpApiSelectRowProps } from '@components/home/components/form-rows/httpApiSelect/httpApiSelectRow';
import { HttpApiType } from '@defines/httpApiType';

export interface IUseHttpApiSelectRowParams extends Pick<HttpApiSelectRowProps, 'setHttpApiType'> {}

export interface IUseHttpApiSelectRow {
    values: IUseHttpApiSelectRowValues;
    handlers: IUseHttpApiSelectRowHandlers;
}

export interface IUseHttpApiSelectRowValues {
    httpApiTypeOptions: SelectBoxOption<HttpApiType>[];
}

export interface IUseHttpApiSelectRowHandlers {
    handleSelectHttpApiType: (type: HttpApiType) => void;
}

export default function useHttpApiSelectRow(params: IUseHttpApiSelectRowParams): IUseHttpApiSelectRow {
    const { setHttpApiType } = params;
    const httpApiTypes: HttpApiType[] = ['fetch', 'axios'];

    const handleSelectHttpApiType = (type: HttpApiType) => {
        setHttpApiType(type);
    };

    const httpApiTypeOptions: SelectBoxOption<HttpApiType>[] = httpApiTypes.map((type) => ({ name: type, value: type }));

    return {
        values: {
            httpApiTypeOptions,
        },
        handlers: {
            handleSelectHttpApiType,
        },
    };
}
