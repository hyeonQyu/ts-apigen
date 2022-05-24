import ApiDocsUriRow from '@components/home/components/form-rows/apiDocsUri/apiDocsUriRow';
import PrettierConfigFileRow from '@components/home/components/form-rows/prettierConfigFile/prettierConfigFileRow';
import ControllerSelectRow from '@components/home/components/form-rows/controllerSelect/controllerSelectRow';
import HttpApiSelectRow from '@components/home/components/form-rows/httpApiSelect/httpApiSelectRow';
import useHome from '@components/home/useHome';
import ControllerLabelContainer from '@components/home/components/controller-label-container/controllerLabelContainer';
import Header from '@components/home/components/header/header';

function Home() {
    const { values, handlers } = useHome();

    return (
        <>
            <Header {...values} {...handlers} />

            <div className={'wrapper'}>
                <div>
                    <form>
                        <ApiDocsUriRow {...values} {...handlers} />
                        <PrettierConfigFileRow {...values} {...handlers} />
                        <ControllerSelectRow {...values} {...handlers} />
                        <HttpApiSelectRow {...values} {...handlers} />
                    </form>

                    <div className={'label-wrapper'}>
                        <ControllerLabelContainer {...values} {...handlers} />
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .wrapper {
                    display: flex;
                    justify-content: center;
                    padding: 20px;
                }

                form,
                .label-wrapper {
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

                .label-wrapper {
                    margin-top: 40px;
                }
            `}</style>
        </>
    );
}

export default Home;
