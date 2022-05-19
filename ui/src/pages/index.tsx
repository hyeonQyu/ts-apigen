import SelectBox from '@components/common/select-box/selectBox';
import { PrettierConfig } from '@defines/prettierConfig';
import InputFile from '@components/common/input-file/inputFile';

function Home() {
    return (
        <>
            <div className={'wrapper'}>
                <form>
                    <div className={'row'}>
                        <span>API docs URI</span>
                        <input className={'uri'} placeholder={'https://my-application.net/api-docs'} />
                    </div>

                    <div className={'row'}>
                        <span>prettier 설정 파일(.prettierrc)</span>
                        <div className={'value'}>
                            <InputFile<PrettierConfig>
                                acceptableExtensionList={['.prettierrc']}
                                isFileJson
                                onChangeFileContent={(fileContent) => console.log(fileContent)}
                            />
                        </div>
                    </div>

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

                    <div className={'row'}>
                        <span>HTTP 통신 방식</span>
                        <div className={'value'}>
                            <SelectBox
                                value={''}
                                options={[
                                    { value: 'axios', name: 'axios' },
                                    { value: 'fetch', name: 'fetch' },
                                ]}
                            />
                        </div>
                    </div>
                </form>
            </div>

            <style jsx global>{`
                .wrapper {
                    display: flex;
                    justify-content: center;
                    padding: 20px;
                }

                form {
                    width: 500px;
                }
                form > * {
                    margin-top: 15px;
                }

                .row {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .row span {
                    width: 30%;
                }

                .row .value {
                    width: 70%;
                }

                .uri {
                    width: 70%;
                    height: 32px;
                    outline: none;
                    border: 1px solid gray;
                    border-radius: 5px;
                    padding: 0 10px;
                }
                .uri:focus {
                    border: 1px solid cornflowerblue;
                }
            `}</style>
        </>
    );
}

export default Home;
