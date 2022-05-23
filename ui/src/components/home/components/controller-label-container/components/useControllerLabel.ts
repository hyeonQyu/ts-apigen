import { ControllerLabelProps } from '@components/home/components/controller-label-container/components/ControllerLabel';

export interface IUseControllerLabelParams extends ControllerLabelProps {}

export interface IUseControllerLabel {
    values: IUseControllerLabelValues;
    handlers: IUseControllerLabelHandlers;
}

export interface IUseControllerLabelValues {}

export interface IUseControllerLabelHandlers {
    handleClickDeleteLabel: () => void;
}

export default function useControllerLabel(params: IUseControllerLabelParams): IUseControllerLabel {
    const { name, setControllers } = params;

    const handleClickDeleteLabel = () => {
        setControllers((prev) => {
            return prev.map((controller) => {
                return name === controller.name ? { name: controller.name, checked: false } : controller;
            });
        });
    };

    return {
        values: {},
        handlers: {
            handleClickDeleteLabel,
        },
    };
}
