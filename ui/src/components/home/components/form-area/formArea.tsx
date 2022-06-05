import ApiDocsUriRow from '@components/home/components/form-area/components/form-rows/apiDocsUri/apiDocsUriRow';
import PrettierConfigFileRow from '@components/home/components/form-area/components/form-rows/prettierConfigFile/prettierConfigFileRow';
import ControllerSelectRow from '@components/home/components/form-area/components/form-rows/controllerSelect/controllerSelectRow';
import ControllerLabelContainer from '@components/home/components/form-area/components/label-container/controller-label-container/controllerLabelContainer';
import SelectedControllerRow from '@components/home/components/form-area/components/form-rows/selectedControllerType/selectedControllerRow';
import HttpApiSelectRow from '@components/home/components/form-area/components/form-rows/httpApiSelect/httpApiSelectRow';
import GeneratedCodePathRow from '@components/home/components/form-area/components/form-rows/generatedCodePath/generatedCodePathRow';
import BaseRootAddRow from '@components/home/components/form-area/components/form-rows/baseRootAdd/baseRootAddRow';
import BaseRootLabelContainer from '@components/home/components/form-area/components/label-container/base-root-label-container/baseRootLabelContainer';
import FormButtons from '@components/home/components/form-area/components/form-buttons/formButtons';
import { useHomeContext } from '@components/home/context/homeContext';
import Loading from '@components/common/loading/loading';

function FormArea() {
    const {
        values: { isLoaded },
    } = useHomeContext();

    return (
        <>
            <div className={'form-area'}>
                <form onSubmit={(e) => e.preventDefault()}>
                    {isLoaded ? (
                        <>
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
                        </>
                    ) : (
                        <div className={'loading-wrapper'}>
                            <Loading width={'12%'} />
                        </div>
                    )}
                    <FormButtons />
                </form>
            </div>

            <style jsx global>{`
                .form-area form,
                .form-area .label-wrapper {
                    width: 570px;
                }
                .form-area form > * {
                    margin-top: 30px;
                }

                .form-area .label-wrapper {
                    margin-top: 15px;
                }

                .loading-wrapper {
                    height: 430px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            `}</style>
        </>
    );
}

export default FormArea;
