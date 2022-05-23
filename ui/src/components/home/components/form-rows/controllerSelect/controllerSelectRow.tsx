import SelectBox from '@components/common/select-box/selectBox';
import { IUseHomeHandlers, IUseHomeValues } from '@components/home/useHome';
import useControllerSelectRow from '@components/home/components/form-rows/controllerSelect/useControllerSelectRow';

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
            <div className={'row'}>
                <span>Controller 선택</span>
                <div className={'value'}>
                    <SelectBox
                        value={selectedControllerNames}
                        placeholder={'컨트롤러 이름으로 검색'}
                        options={controllerOptions}
                        onChange={handleChangeSelectedOptions}
                        optionSize={10}
                        boxTitle={'컨트롤러를 선택하세요.'}
                    />
                </div>
            </div>

            <style jsx>{``}</style>
        </>
    );
}

export default ControllerSelectRow;
