import SelectBox from '@components/common/select-box/selectBox';
import { IUseHomeHandlers, IUseHomeValues } from '@components/home/useHome';
import useControllerSelectRow from '@components/home/components/form-rows/controllerSelect/useControllerSelectRow';
import FormRow from '@components/home/components/form-rows/common/formRow';

export interface ControllerSelectRowProps
    extends Pick<IUseHomeValues, 'controllers' | 'selectedControllerNames'>,
        Pick<IUseHomeHandlers, 'setControllers'> {}

function ControllerSelectRow(props: ControllerSelectRowProps) {
    const { selectedControllerNames } = props;
    const {
        values: { controllerOptions },
        handlers: { handleChangeSelectedOptions },
    } = useControllerSelectRow(props);

    return (
        <>
            <FormRow title={'Controller 선택'}>
                <SelectBox
                    value={selectedControllerNames}
                    placeholder={'컨트롤러 이름으로 검색'}
                    options={controllerOptions}
                    onChange={handleChangeSelectedOptions}
                    optionSize={10}
                    boxTitle={'컨트롤러를 선택하세요.'}
                />
            </FormRow>

            <style jsx>{``}</style>
        </>
    );
}

export default ControllerSelectRow;
