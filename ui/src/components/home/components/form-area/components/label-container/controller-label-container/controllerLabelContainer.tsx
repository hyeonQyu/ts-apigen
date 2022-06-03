import LabelContainer from '@components/home/components/form-area/components/label-container/common/labelContainer';
import Label from '@components/common/label/label';
import { useHomeContext } from '@components/home/context/homeContext';

function ControllerLabelContainer() {
    const {
        values: { selectedControllerNames, selectedControllerType },
        handlers: { handleClickDeleteControllerLabel },
    } = useHomeContext();

    return (
        <>
            <LabelContainer
                message={'💡 선택된 Controller가 없으면 모든 Controller에 대한 API 요청 코드가 생성됩니다.'}
                isShowMessage={selectedControllerNames.length === 0}
            >
                {selectedControllerNames.map((name) => {
                    const handleClickDelete = () => handleClickDeleteControllerLabel(name);
                    return (
                        <Label
                            key={name}
                            onClickDelete={handleClickDelete}
                            className={'controller-label'}
                            backgroundColor={selectedControllerType === 'EXCLUDE' ? '#ff7373' : '#5192f1'}
                        >
                            {name}
                        </Label>
                    );
                })}
            </LabelContainer>

            <style jsx global>{`
                .controller-label {
                    margin-right: 10px;
                    margin-bottom: 10px;
                }
            `}</style>
        </>
    );
}

export default ControllerLabelContainer;
