import InputFile from '@components/input-file/inputFile';
import { PrettierConfig } from '../defines/prettierConfig';

function Home() {
    return (
        <>
            <div className={'wrapper'}>
                <form>
                    <div className={'row'}>
                        <span>API docs URI</span>
                        <input placeholder={'https://my-application.net/api-docs'} />
                    </div>

                    <div className={'row'}>
                        <span>prettier 설정 파일(.prettierrc)</span>
                        <div className={'input-file'}>
                            <InputFile<PrettierConfig>
                                acceptableExtensionList={['.prettierrc']}
                                isFileJson
                                onChangeFileContent={(fileContent) => console.log(fileContent)}
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

                .row .input-file {
                    width: 70%;
                }

                input {
                    width: 70%;
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

export default Home;
