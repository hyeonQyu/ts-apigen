import ApiDocsUriRow from '@components/home/components/form-rows/apiDocsUri/apiDocsUriRow';
import PrettierConfigFileRow from '@components/home/components/form-rows/prettierConfigFile/prettierConfigFileRow';
import ControllerSelectRow from '@components/home/components/form-rows/controllerSelect/controllerSelectRow';
import HttpApiSelectRow from '@components/home/components/form-rows/httpApiSelect/httpApiSelectRow';
import useHome from '@components/home/useHome';
import ControllerLabelContainer from '@components/home/components/label-container/controller-label-container/controllerLabelContainer';
import Header from '@components/home/components/header/header';
import BaseRootAddRow from '@components/home/components/form-rows/baseRootAdd/baseRootAddRow';
import BaseRootLabelContainer from '@components/home/components/label-container/base-root-label-container/baseRootLabelContainer';
import { FormEvent } from 'react';

function Home() {
    const { values, handlers } = useHome();

    const onsubmit: FormEvent<HTMLFormElement> = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <Header {...values} {...handlers} />

            <div className={'wrapper'}>
                <div>
                    <form onSubmit={onsubmit}>
                        <ApiDocsUriRow {...values} {...handlers} />
                        <PrettierConfigFileRow {...values} {...handlers} />
                        <ControllerSelectRow {...values} {...handlers} />
                        <div className={'label-wrapper'}>
                            <ControllerLabelContainer {...values} {...handlers} />
                        </div>
                        <HttpApiSelectRow {...values} {...handlers} />
                        <BaseRootAddRow {...values} {...handlers} />
                        <div className={'label-wrapper'}>
                            <BaseRootLabelContainer {...values} {...handlers} />
                        </div>
                    </form>
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

                .label-wrapper {
                    margin-top: 15px;
                }
            `}</style>
        </>
    );
}

export default Home;
