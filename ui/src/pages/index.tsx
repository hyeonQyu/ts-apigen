import ApiDocsUriRow from '@components/home/components/form-rows/apiDocsUri/apiDocsUriRow';
import PrettierConfigFileRow from '@components/home/components/form-rows/prettierConfigFile/prettierConfigFileRow';
import ControllerSelectRow from '@components/home/components/form-rows/controllerSelect/controllerSelectRow';
import HttpApiSelectRow from '@components/home/components/form-rows/httpApiSelect/httpApiSelectRow';
import useHome from '@hooks/pages/useHome';
import ControllerLabelContainer from '@components/home/components/label-container/controller-label-container/controllerLabelContainer';
import BaseRootAddRow from '@components/home/components/form-rows/baseRootAdd/baseRootAddRow';
import BaseRootLabelContainer from '@components/home/components/label-container/base-root-label-container/baseRootLabelContainer';
import { HomeContext } from '@components/home/context/homeContext';
import SelectedControllerRow from '@components/home/components/form-rows/selectedControllerType/selectedControllerRow';
import GeneratedCodePathRow from '@components/home/components/form-rows/generatedCodePath/generatedCodePathRow';
import ControllerInitDialog from '@components/home/components/controller-init-dialog/controllerInitDialog';
import { assetBackground } from '@public/assets/background';
import Lottie from 'lottie-react';
import { lottieMain } from '@public/assets/lotties/main';
import FormButtons from '@components/home/components/form-buttons/formButtons';

// export interface HomeProps {
//     config: Config;
//     controllerNames: string[];
// }

function Home(/*props: HomeProps*/) {
    const home = useHome();
    const {
        values: { hasLottie },
        handlers: { handleSubmitForm },
    } = home;

    return (
        <>
            <HomeContext.Provider value={home}>
                <div className={'background'}>
                    <div className={'home-wrapper'}>
                        {hasLottie && (
                            <div className={'lottie-area'}>
                                <Lottie animationData={lottieMain} loop autoPlay />
                            </div>
                        )}

                        <div className={'form-area'}>
                            <form onSubmit={handleSubmitForm}>
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
                                <FormButtons />
                            </form>
                        </div>
                    </div>

                    <ControllerInitDialog />
                </div>
            </HomeContext.Provider>

            <style jsx global>{`
                .background {
                    background: url(${assetBackground.background});
                    background-size: cover;
                    height: 100%;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .home-wrapper {
                    background-color: white;
                    border-radius: 40px;
                    display: flex;
                    justify-content: center;
                    padding: 60px;
                    position: relative;
                }
                .home-wrapper:before,
                .home-wrapper:after {
                    content: '';
                    position: absolute;
                    background-color: white;
                    border-radius: 50%;
                    width: 130px;
                    height: 70px;
                }
                .home-wrapper:before {
                    top: -35px;
                    left: 80px;
                }
                .home-wrapper:after {
                    bottom: -35px;
                    right: 80px;
                }

                .lottie-area {
                    width: 480px;
                    display: flex;
                    align-items: center;
                }

                .home-area {
                }

                .home-wrapper form,
                .home-wrapper .label-wrapper {
                    width: 570px;
                }
                .home-wrapper form > * {
                    margin-top: 30px;
                }

                .home-wrapper .label-wrapper {
                    margin-top: 15px;
                }
            `}</style>
        </>
    );
}

export default Home;
