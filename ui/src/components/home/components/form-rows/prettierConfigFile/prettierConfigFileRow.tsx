import InputFile from '@components/common/input-file/inputFile';
import { PrettierConfig } from '@defines/prettierConfig';
import { IUseHomeHandlers, IUseHomeValues } from '@components/home/useHome';
import FormRow from '@components/home/components/form-rows/common/formRow';

export interface PrettierConfigFileRowProps extends Pick<IUseHomeValues, 'prettierConfig'>, Pick<IUseHomeHandlers, 'setPrettierConfig'> {}

function PrettierConfigFileRow(props: PrettierConfigFileRowProps) {
    const { prettierConfig, setPrettierConfig } = props;

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
