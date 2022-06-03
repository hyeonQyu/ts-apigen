import React from 'react';
import { IUseHome } from '@hooks/pages/useHome';

export interface IHomeContext extends IUseHome {}

export const HomeContext = React.createContext<IHomeContext>({
    values: {
        uri: '',
        prettierConfig: null,
        controllers: [],
        selectedControllerNames: [],
        controllerOptions: [],
        selectedControllerType: 'INCLUDE',
        httpApiType: 'axios',
        httpApiTypeOptions: [],
        baseRoot: '',
        baseRootSet: new Set(),
        generatedCodePath: '',
        isControllerInitDialogOpened: false,
        hasLottie: true,
    },
    handlers: {
        handleOpenControllerInitDialog: () => {},
        handleCloseControllerInitDialog: () => {},
        handleInitController: () => {},
        handleSubmitForm: () => {},

        setUri: () => {},
        handleUseApiDocsUriBlur: () => {},
        handleUseApiDocsUriFocus: () => {},

        setPrettierConfig: () => {},

        handleSelectController: () => {},
        handleClickDeleteControllerLabel: () => {},

        handleChangeSelectedControllerType: () => {},

        handleSelectHttpApiType: () => {},

        setGeneratedCodePath: () => {},

        setBaseRoot: () => {},
        handleBaseRootAddInputKeyPress: () => {},
        handleClickDeleteBaseRootLabel: () => {},
    },
});

export const useHomeContext = () => React.useContext(HomeContext);
