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
            <LabelContainer message={''} isShowMessage>
                {Array.from(baseRootSet).map((baseRoot) => {
                    const handleClickDelete = () => handleClickDeleteBaseRootLabel(baseRoot);
                    return (
                        <Label key={baseRoot} onClickDelete={handleClickDelete} className={'base-root-label'} backgroundColor={'green'}>
                            {baseRoot}
                        </Label>
                    );
                })}
            </LabelContainer>

            <style jsx>{`
                .base-root-label {
                    margin-right: 10px;
                    margin-bottom: 10px;
                }
            `}</style>
        </>
    );
}

export default BaseRootLabelContainer;
