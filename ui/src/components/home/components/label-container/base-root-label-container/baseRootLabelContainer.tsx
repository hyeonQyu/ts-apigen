import LabelContainer from '@components/home/components/label-container/common/labelContainer';
import { useHomeContext } from '@components/home/context/homeContext';
import Label from '@components/common/label/label';

function BaseRootLabelContainer() {
    const {
        values: { baseRootSet },
        handlers: { handleClickDeleteBaseRootLabel },
    } = useHomeContext();

    return (
        <>
            <LabelContainer message={'💡 Base Root 입력 후 Enter 키를 누르면 추가됩니다.'} isShowMessage={baseRootSet.size === 0}>
                {Array.from(baseRootSet).map((baseRoot) => {
                    const handleClickDelete = () => handleClickDeleteBaseRootLabel(baseRoot);
                    return (
                        <Label key={baseRoot} onClickDelete={handleClickDelete} className={'base-root-label'} backgroundColor={'#19b719'}>
                            {baseRoot}
                        </Label>
                    );
                })}
            </LabelContainer>

            <style jsx global>{`
                .base-root-label {
                    margin-right: 10px;
                    margin-bottom: 10px;
                }
            `}</style>
        </>
    );
}

export default BaseRootLabelContainer;
