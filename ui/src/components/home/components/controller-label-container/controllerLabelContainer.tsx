import { IUseHomeHandlers, IUseHomeValues } from '@components/home/useHome';
import ControllerLabel from '@components/home/components/controller-label-container/components/ControllerLabel';

export interface ControllerLabelContainerProps
    extends Pick<IUseHomeValues, 'selectedControllerNames'>,
        Pick<IUseHomeHandlers, 'setControllers'> {}

function ControllerLabelContainer(props: ControllerLabelContainerProps) {
    const { selectedControllerNames, setControllers } = props;

    return (
        <>
            {selectedControllerNames.length === 0 && (
                <p className={'controller-message'}>💡 선택된 Controller가 없으면 모든 Controller에 대한 API 요청 코드가 생성됩니다.</p>
            )}
            <div className={'container'}>
                {selectedControllerNames.map((name) => (
                    <ControllerLabel key={name} name={name} setControllers={setControllers} />
                ))}
            </div>

            <style jsx global>{`
                .controller-message {
                    line-height: 1.5;
                }
                .container {
                    display: flex;
                    flex-wrap: wrap;
                }

                .label {
                    margin-right: 10px;
                    margin-bottom: 10px;
                }
            `}</style>
        </>
    );
}

export default ControllerLabelContainer;
