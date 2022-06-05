import InputFile from '@components/common/input-file/inputFile';
import { PrettierConfig } from '@defines/prettierConfig';
import FormRow from '@components/home/components/form-area/components/form-rows/common/formRow';
import { useHomeContext } from '@components/home/context/homeContext';
import SpeechBubble from '@components/common/speech-bubble/speechBubble';
import usePrettierConfigFileRow from '@components/home/components/form-area/components/form-rows/prettierConfigFile/usePrettierConfigFileRow';

function PrettierConfigFileRow() {
    const {
        values: { prettierConfigFileName, prettierConfig },
        handlers: { handleChangePrettierConfigFileName, handleChangePrettierConfig },
    } = useHomeContext();

    const {
        values: { isPrettierConfigTooltipShow, prettierConfigOptions },
        handlers: { handleShowPrettierConfigTooltip, handleHidePrettierConfigTooltip },
    } = usePrettierConfigFileRow({ prettierConfig });

    return (
        <>
            <FormRow title={'prettier 설정 파일(.prettierrc)'}>
                <div className={'form__prettier-wrapper'}>
                    <InputFile<PrettierConfig>
                        acceptableExtensionList={['.prettierrc']}
                        isFileJson
                        text={prettierConfigFileName}
                        onChangeFileName={handleChangePrettierConfigFileName}
                        onChangeFileContent={handleChangePrettierConfig}
                        onMouseEnterText={handleShowPrettierConfigTooltip}
                        onMouseLeaveText={handleHidePrettierConfigTooltip}
                    />
                    <SpeechBubble isShow={isPrettierConfigTooltipShow} tailMargin={17} left={76} top={40}>
                        {prettierConfigOptions.map(({ key, value }) => (
                            <p key={key} className={'prettier-option'}>
                                <span>{key}: </span>
                                <strong>{value}</strong>
                            </p>
                        ))}
                    </SpeechBubble>
                </div>
            </FormRow>

            <style jsx global>{`
                .form__prettier-wrapper {
                    position: relative;
                }

                .form__prettier-wrapper span {
                    cursor: pointer;
                }

                .form__prettier-wrapper .prettier-option {
                    line-height: 1.5;
                }

                .form__prettier-wrapper .prettier-option strong {
                    color: #0070f3;
                    font-weight: 500;
                }
            `}</style>
        </>
    );
}

export default PrettierConfigFileRow;
