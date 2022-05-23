import { IUseHomeHandlers, IUseHomeValues } from '@components/home/useHome';
import Label from '@components/common/label/label';
import ControllerLabel from '@components/home/components/controller-label-container/components/ControllerLabel';

export interface ControllerLabelContainerProps
    extends Pick<IUseHomeValues, 'selectedControllerNames'>,
        Pick<IUseHomeHandlers, 'setControllers'> {}

function ControllerLabelContainer(props: ControllerLabelContainerProps) {
    const { selectedControllerNames, setControllers } = props;

    return (
        <>
            {selectedControllerNames.length === 0 && (
                <p>💡 선택된 Controller가 없으면 모든 Controller에 대한 API 요청 코드가 생성됩니다.</p>
            )}
            <div className={'container'}>
                {selectedControllerNames.map((name) => (
                    <ControllerLabel name={name} setControllers={setControllers} />
                ))}
                <Label onClickDelete={() => {}} className={'label'}>
                    AbcController
                </Label>
                <Label onClickDelete={() => {}} className={'label'}>
                    AbcColler
                </Label>
                <Label onClickDelete={() => {}} className={'label'}>
                    AbcContller
                </Label>
                <Label onClickDelete={() => {}} className={'label'}>
                    oller
                </Label>
                <Label onClickDelete={() => {}} className={'label'}>
                    AbcController
                </Label>
                <Label onClickDelete={() => {}} className={'label'}>
                    AbcC
                </Label>
                <Label onClickDelete={() => {}} className={'label'}>
                    AbcColler
                </Label>
                <Label onClickDelete={() => {}} className={'label'}>
                    AbcConroller
                </Label>
            </div>

            <style jsx global>{`
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
