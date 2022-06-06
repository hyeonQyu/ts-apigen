import SelectBox from '@components/common/select-box/selectBox';
import FormRow from '@components/home/components/form-area/components/form-rows/common/formRow';
import { useHomeContext } from '@components/home/context/homeContext';
import Loading from '@components/common/loading/loading';

function ControllerSelectRow() {
    const {
        values: { isControllerLoading, controllerOptions, selectedControllerNames },
        handlers: { handleSelectController },
    } = useHomeContext();

    return (
        <>
            <FormRow title={'Controller 선택'}>
                {isControllerLoading ? (
                    <Loading type={'controller'} height={40} width={120} />
                ) : (
                    <SelectBox
                        value={selectedControllerNames}
                        placeholder={'Controller 이름으로 검색'}
                        options={controllerOptions}
                        onChange={handleSelectController}
                        optionSize={10}
                        boxTitle={'Controller를 선택하세요.'}
                    />
                )}
            </FormRow>

            <style jsx>{``}</style>
        </>
    );
}

export default ControllerSelectRow;
