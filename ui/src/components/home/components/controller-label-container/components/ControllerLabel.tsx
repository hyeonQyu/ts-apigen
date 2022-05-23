import Label from '@components/common/label/label';
import { ControllerLabelContainerProps } from '@components/home/components/controller-label-container/controllerLabelContainer';

export interface ControllerLabelProps extends Pick<ControllerLabelContainerProps, 'setControllers'> {
    name: string;
}

function ControllerLabel(props: ControllerLabelProps) {
    const { name } = props;

    return (
        <>
            <div className={'label'}>
                <Label>{name}</Label>
            </div>

            <style jsx>{``}</style>
        </>
    );
}

export default ControllerLabel;
