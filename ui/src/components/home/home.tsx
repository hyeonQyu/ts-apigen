import ApiDocsUriRow from '@components/home/components/form-rows/apiDocsUri/apiDocsUriRow';
import PrettierConfigFileRow from '@components/home/components/form-rows/prettierConfigFile/prettierConfigFileRow';
import ControllerSelectRow from '@components/home/components/form-rows/controllerSelect/controllerSelectRow';
import HttpApiSelectRow from '@components/home/components/form-rows/httpApiSelect/httpApiSelectRow';
import useHome from '@components/home/useHome';

function Home() {
    const {
        values: { uri, prettierConfig, controllers, selectedControllerNames, httpApiType },
        handlers: { setUri, setIsLoadController, setPrettierConfig, setControllers, setHttpApiType },
    } = useHome();

    return (
        <>
            <div className={'wrapper'}>
                <form>
                    <ApiDocsUriRow uri={uri} setUri={setUri} setIsLoadController={setIsLoadController} />
                    <PrettierConfigFileRow prettierConfig={prettierConfig} setPrettierConfig={setPrettierConfig} />
                    <ControllerSelectRow
                        controllers={controllers}
                        setControllers={setControllers}
                        selectedControllerNames={selectedControllerNames}
                    />
                    <HttpApiSelectRow httpApiType={httpApiType} setHttpApiType={setHttpApiType} />
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
            `}</style>
        </>
    );
}

export default Home;
