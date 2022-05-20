import InputFile from '@components/common/input-file/inputFile';
import { PrettierConfig } from '@defines/prettierConfig';
import { IUseHomeHandlers, IUseHomeValues } from '@components/home/hooks/useHome';

export interface PrettierConfigFileRowProps extends Pick<IUseHomeValues, 'prettierConfig'>, Pick<IUseHomeHandlers, 'setPrettierConfig'> {}

function PrettierConfigFileRow(props: PrettierConfigFileRowProps) {
    const { prettierConfig, setPrettierConfig } = props;

    return (
        <>
            <div className={'row'}>
                <span>prettier 설정 파일(.prettierrc)</span>
                <div className={'value'}>
                    <InputFile<PrettierConfig>
                        acceptableExtensionList={['.prettierrc']}
                        isFileJson
                        onChangeFileContent={setPrettierConfig}
                    />
                </div>
            </div>

            <style jsx>{``}</style>
        </>
    );
}

export default PrettierConfigFileRow;
