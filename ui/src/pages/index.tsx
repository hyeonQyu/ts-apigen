import ApiDocsUriRow from '@components/home/form-rows/apiDocsUri/apiDocsUriRow';
import PrettierConfigFileRow from '@components/home/form-rows/prettierConfigFile/prettierConfigFileRow';
import ControllerSelectRow from '@components/home/form-rows/controllerSelect/controllerSelectRow';
import HttpApiRow from '@components/home/form-rows/httpApi/httpApiRow';

function Home() {
    return (
        <>
            <div className={'wrapper'}>
                <form>
                    <ApiDocsUriRow />
                    <PrettierConfigFileRow />
                    <ControllerSelectRow />
                    <HttpApiRow />
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
