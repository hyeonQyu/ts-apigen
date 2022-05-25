import { IUseHomeHandlers, IUseHomeValues } from '@components/home/useHome';
import LabelContainer from '@components/home/components/form-rows/baseRootAdd/labelContainer';
import BaseRootLabel from '@components/home/components/label-container/base-root-label-container/components/BaseRootLabel';

export interface BaseRootLabelContainerProps extends Pick<IUseHomeValues, 'baseRootSet'>, Pick<IUseHomeHandlers, 'setBaseRootSet'> {}

function BaseRootLabelContainer(props: BaseRootLabelContainerProps) {
    const { baseRootSet, setBaseRootSet } = props;

    return (
        <>
            <LabelContainer message={''} isShowMessage>
                {Array.from(baseRootSet).map((baseRoot) => (
                    <BaseRootLabel key={baseRoot} baseRoot={baseRoot} setBaseRootSet={setBaseRootSet} />
                ))}
            </LabelContainer>

            <style jsx>{``}</style>
        </>
    );
}

export default BaseRootLabelContainer;
