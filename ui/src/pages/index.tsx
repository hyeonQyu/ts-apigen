import ApiDocsUriRow from '@components/home/components/form-rows/apiDocsUri/apiDocsUriRow';
import PrettierConfigFileRow from '@components/home/components/form-rows/prettierConfigFile/prettierConfigFileRow';
import ControllerSelectRow from '@components/home/components/form-rows/controllerSelect/controllerSelectRow';
import HttpApiSelectRow from '@components/home/components/form-rows/httpApiSelect/httpApiSelectRow';
import useHome from '@hooks/pages/useHome';
import ControllerLabelContainer from '@components/home/components/label-container/controller-label-container/controllerLabelContainer';
import Header from '@components/home/components/header/header';
import BaseRootAddRow from '@components/home/components/form-rows/baseRootAdd/baseRootAddRow';
import BaseRootLabelContainer from '@components/home/components/label-container/base-root-label-container/baseRootLabelContainer';
import { HomeContext } from '@components/home/context/homeContext';
import SelectedControllerRow from '@components/home/components/form-rows/selectedControllerType/selectedControllerRow';
import GeneratedCodePathRow from '@components/home/components/form-rows/generatedCodePath/generatedCodePathRow';
import { HomeApi } from '@requests/apis/homeApi';
import { Config } from '@defines/config';

export interface HomeProps {
    config: Config;
}

function Home(props: HomeProps) {
    return (
        <>
            <HomeContext.Provider value={useHome(props)}>
                <Header />

                <div className={'wrapper'}>
                    <div>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                            }}
                        >
                            <ApiDocsUriRow />
                            <PrettierConfigFileRow />
                            <ControllerSelectRow />
                            <div className={'label-wrapper'}>
                                <ControllerLabelContainer />
                            </div>
                            <SelectedControllerRow />
                            <HttpApiSelectRow />
                            <GeneratedCodePathRow />
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
                    width: 600px;
                }
                form > * {
                    margin-top: 30px;
                }

                .label-wrapper {
                    margin-top: 15px;
                }
            `}</style>
        </>
    );
}

export default Home;

export async function getServerSideProps() {
    const { config } = await HomeApi.getConfig();
    return {
        props: { config },
    };
}
