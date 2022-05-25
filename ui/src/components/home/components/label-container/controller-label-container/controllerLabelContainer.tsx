import { IUseHomeHandlers, IUseHomeValues } from '@components/home/useHome';
import ControllerLabel from '@components/home/components/label-container/controller-label-container/components/ControllerLabel';
import LabelContainer from '@components/home/components/form-rows/baseRootAdd/labelContainer';

export interface ControllerLabelContainerProps
    extends Pick<IUseHomeValues, 'selectedControllerNames'>,
        Pick<IUseHomeHandlers, 'setControllers'> {}

function ControllerLabelContainer(props: ControllerLabelContainerProps) {
    const { selectedControllerNames, setControllers } = props;

    return (
        <>
            <LabelContainer
                message={'💡 선택된 Controller가 없으면 모든 Controller에 대한 API 요청 코드가 생성됩니다.'}
                isShowMessage={selectedControllerNames.length === 0}
            >
                {selectedControllerNames.map((name) => (
                    <ControllerLabel key={name} name={name} setControllers={setControllers} />
                ))}
            </LabelContainer>

            <style jsx>{``}</style>
        </>
    );
}

export default ControllerLabelContainer;
