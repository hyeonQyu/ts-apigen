import ApiDocsUriRow from '@components/home/components/form-rows/apiDocsUri/apiDocsUriRow';
import PrettierConfigFileRow from '@components/home/components/form-rows/prettierConfigFile/prettierConfigFileRow';
import ControllerSelectRow from '@components/home/components/form-rows/controllerSelect/controllerSelectRow';
import HttpApiSelectRow from '@components/home/components/form-rows/httpApiSelect/httpApiSelectRow';
import useHome from '@components/home/useHome';
import ControllerLabelContainer from '@components/home/components/label-container/controller-label-container/controllerLabelContainer';
import Header from '@components/home/components/header/header';
import BaseRootAddRow from '@components/home/components/form-rows/baseRootAdd/baseRootAddRow';
import BaseRootLabelContainer from '@components/home/components/label-container/base-root-label-container/baseRootLabelContainer';
import { HomeContext } from '@components/home/context/homeContext';

function Home() {
    // const { values, handlers } = useHome();

    return (
        <>
            <HomeContext.Provider value={useHome()}>
                <Header />

                <div className={'wrapper'}>
                    <div>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <ApiDocsUriRow />
                            <PrettierConfigFileRow />
                            <ControllerSelectRow />
                            <div className={'label-wrapper'}>
                                <ControllerLabelContainer />
                            </div>
                            <HttpApiSelectRow />
                            <BaseRootAddRow />
                            <div className={'label-wrapper'}>
                                <BaseRootLabelContainer />
                            </div>
                        </form>
                    </div>
                </div>
            </HomeContext.Provider>

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

                .label-wrapper {
                    margin-top: 15px;
                }
            `}</style>
        </>
    );
}

export default Home;
