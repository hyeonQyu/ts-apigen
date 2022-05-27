import React from 'react';
import { IUseHome } from '@components/home/useHome';

export interface IHomeContext extends IUseHome {}

export const HomeContext = React.createContext<IHomeContext>({
    values: {
        uri: '',
        prettierConfig: null,
        controllers: [],
        selectedControllerNames: [],
        controllerOptions: [],
        httpApiType: 'axios',
        httpApiTypeOptions: [],
        baseRoot: '',
        baseRootSet: new Set(),
    },
    handlers: {
        handleClickInitSelectedController: () => {},
        handleClickGenerateCode: () => {},

        setUri: () => {},
        handleUseApiDocsUriBlur: () => {},
        handleUseApiDocsUriFocus: () => {},

        setPrettierConfig: () => {},

        handleSelectController: () => {},
        handleClickDeleteControllerLabel: () => {},

        handleSelectHttpApiType: () => {},

        setBaseRoot: () => {},
        handleBaseRootAddInputKeyPress: () => {},
        handleClickDeleteBaseRootLabel: () => {},
    },
});

export const useHomeContext = () => React.useContext(HomeContext);
