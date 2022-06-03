import InputFile from '@components/common/input-file/inputFile';
import { PrettierConfig } from '@defines/prettierConfig';
import FormRow from '@components/home/components/form-area/components/form-rows/common/formRow';
import { useHomeContext } from '@components/home/context/homeContext';

function PrettierConfigFileRow() {
    const {
        values: { prettierConfig },
        handlers: { setPrettierConfig },
    } = useHomeContext();

    return (
        <>
            <FormRow title={'prettier 설정 파일(.prettierrc)'}>
                <InputFile<PrettierConfig> acceptableExtensionList={['.prettierrc']} isFileJson onChangeFileContent={setPrettierConfig} />
            </FormRow>

            <style jsx>{``}</style>
        </>
    );
}

export default PrettierConfigFileRow;
