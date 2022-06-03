import SelectBox from '@components/common/select-box/selectBox';
import FormRow from '@components/home/components/form-area/components/form-rows/common/formRow';
import { useHomeContext } from '@components/home/context/homeContext';

function ControllerSelectRow() {
    const {
        values: { controllerOptions, selectedControllerNames },
        handlers: { handleSelectController },
    } = useHomeContext();

    return (
        <>
            <FormRow title={'Controller 선택'}>
                <SelectBox
                    value={selectedControllerNames}
                    placeholder={'컨트롤러 이름으로 검색'}
                    options={controllerOptions}
                    onChange={handleSelectController}
                    optionSize={10}
                    boxTitle={'컨트롤러를 선택하세요.'}
                />
            </FormRow>

            <style jsx>{``}</style>
        </>
    );
}

export default ControllerSelectRow;
