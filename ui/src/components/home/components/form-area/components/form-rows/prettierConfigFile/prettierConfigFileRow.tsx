import InputFile from '@components/common/input-file/inputFile';
import { PrettierConfig } from '@defines/prettierConfig';
import FormRow from '@components/home/components/form-area/components/form-rows/common/formRow';
import { useHomeContext } from '@components/home/context/homeContext';

function PrettierConfigFileRow() {
    const {
        values: { prettierConfigFileName, prettierConfig },
        handlers: { handleChangePrettierConfigFileName, handleChangePrettierConfig },
    } = useHomeContext();

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
                    />
                </div>
            </FormRow>

            <style jsx global>{`
                .form__prettier-wrapper span {
                    cursor: pointer;
                }
            `}</style>
        </>
    );
}

export default PrettierConfigFileRow;
