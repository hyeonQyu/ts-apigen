import useHome from '@hooks/pages/useHome';
import { HomeContext } from '@components/home/context/homeContext';
import ControllerInitDialog from '@components/home/components/controller-init-dialog/controllerInitDialog';
import { assetBackground } from '@public/assets/background';
import FormArea from '@components/home/components/form-area/formArea';
import LottieArea from '@components/home/components/lottie-area/lottieArea';

export interface HomeProps {}

function Home(/*props: HomeProps*/) {
    const home = useHome();

    return (
        <>
            <HomeContext.Provider value={home}>
                <div className={'background'}>
                    <div className={'home-wrapper'}>
                        <LottieArea />
                        <FormArea />
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
            `}</style>
        </>
    );
}

export default Home;
