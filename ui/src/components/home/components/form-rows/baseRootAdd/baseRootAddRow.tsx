import FormRow from '@components/home/components/form-rows/common/formRow';
import { IUseHomeHandlers } from '@components/home/useHome';
import useBaseRootAddRow from '@components/home/components/form-rows/baseRootAdd/useBaseRootAddRow';
import useInput from '@hooks/useInput';

export interface BaseRootAddRowProps extends Pick<IUseHomeHandlers, 'setBaseRootSet'> {}

function BaseRootAddRow(props: BaseRootAddRowProps) {
    const {} = props;
    const { onChange, value: baseRoot, setValue: setBaseRoot } = useInput();
    const {
        handlers: { handleInputKeyPress },
    } = useBaseRootAddRow({ ...props, baseRoot, setBaseRoot });

    return (
        <>
            <FormRow title={'Base Root 추가'}>
                <input placeholder={'root/'} onKeyPress={handleInputKeyPress} onChange={onChange} value={baseRoot} />
            </FormRow>

            <style jsx>{`
                input {
                    width: 100%;
                    height: 32px;
                    outline: none;
                    border: 1px solid gray;
                    border-radius: 5px;
                    padding: 0 10px;
                }

                input:focus {
                    border: 1px solid cornflowerblue;
                }
            `}</style>
        </>
    );
}

export default BaseRootAddRow;
