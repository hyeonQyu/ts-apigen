import SelectBox from '@components/common/select-box/selectBox';

export interface ControllerSelectRowProps {}

function ControllerSelectRow(props: ControllerSelectRowProps) {
    const {} = props;

    return (
        <>
            <div className={'row'}>
                <span>Controller 선택</span>
                <div className={'value'}>
                    <SelectBox
                        value={[1]}
                        placeholder={'번호 입력'}
                        options={(() => {
                            let arr = [];
                            for (let i = 1; i <= 24; i++) {
                                arr.push({
                                    value: i,
                                    name: `${i}번`,
                                });
                            }
                            return arr;
                        })()}
                        onChange={(value, selected) => {
                            console.log(value, selected);
                        }}
                        optionSize={10}
                    />
                </div>
            </div>

            <style jsx>{``}</style>
        </>
    );
}

export default ControllerSelectRow;
