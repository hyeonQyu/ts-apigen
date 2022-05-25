import { BaseRootLabelContainerProps } from '@components/home/components/label-container/base-root-label-container/baseRootLabelContainer';
import Label from '@components/common/label/label';
import useBaseRootLabel from '@components/home/components/label-container/base-root-label-container/components/useBaseRootLabel';

export interface BaseRootLabelProps extends Pick<BaseRootLabelContainerProps, 'setBaseRootSet'> {
    baseRoot: string;
}

function BaseRootLabel(props: BaseRootLabelProps) {
    const { baseRoot } = props;
    const {
        handlers: { handleClickDeleteLabel },
    } = useBaseRootLabel(props);

    return (
        <>
            <div className={'label'}>
                <Label onClickDelete={handleClickDeleteLabel} backgroundColor={'green'}>
                    {baseRoot}
                </Label>
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

export default BaseRootLabel;
