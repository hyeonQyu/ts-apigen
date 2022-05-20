import SelectBox from '@components/common/select-box/selectBox';
import { IUseHomeHandlers, IUseHomeValues } from '@components/home/hooks/useHome';
import useControllerSelectRow from '@components/home/components/form-rows/controllerSelect/hooks/useControllerSelectRow';

export interface ControllerSelectRowProps extends Pick<IUseHomeValues, 'controllers'>, Pick<IUseHomeHandlers, 'setControllers'> {}

function ControllerSelectRow(props: ControllerSelectRowProps) {
    const {
        values: { controllerOptions, selectedControllerNames },
        handlers: { handleChangeSelectedOptions },
    } = useControllerSelectRow(props);

    return (
        <>
            <div className={'row'}>
                <span>Controller 선택</span>
                <div className={'value'}>
                    <SelectBox
                        value={selectedControllerNames}
                        placeholder={'번호 입력'}
                        options={controllerOptions}
                        onChange={handleChangeSelectedOptions}
                        optionSize={10}
                    />
                </div>
            </div>

            <style jsx>{``}</style>
        </>
    );
}

export default ControllerSelectRow;
