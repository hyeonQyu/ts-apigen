import Label from '@components/common/label/label';
import { ControllerLabelContainerProps } from '@components/home/components/controller-label-container/controllerLabelContainer';
import useControllerLabel from '@components/home/components/controller-label-container/components/useControllerLabel';

export interface ControllerLabelProps extends Pick<ControllerLabelContainerProps, 'setControllers'> {
    name: string;
}

function ControllerLabel(props: ControllerLabelProps) {
    const { name } = props;
    const {
        handlers: { handleClickDeleteLabel },
    } = useControllerLabel(props);

    return (
        <>
            <div className={'label'}>
                <Label onClickDelete={handleClickDeleteLabel}>{name}</Label>
            </div>

            <style jsx>{`
                .label {
                    margin-right: 10px;
                    margin-bottom: 10px;
                }
            `}</style>
        </>
    );
}

export default ControllerLabel;
