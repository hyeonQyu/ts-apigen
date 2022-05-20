import InputFile from '@components/common/input-file/inputFile';
import { PrettierConfig } from '@defines/prettierConfig';

export interface PrettierConfigFileRowProps {}

function PrettierConfigFileRow(props: PrettierConfigFileRowProps) {
    const {} = props;

    return (
        <>
            <div className={'row'}>
                <span>prettier 설정 파일(.prettierrc)</span>
                <div className={'value'}>
                    <InputFile<PrettierConfig>
                        acceptableExtensionList={['.prettierrc']}
                        isFileJson
                        onChangeFileContent={(fileContent) => console.log(fileContent)}
                    />
                </div>
            </div>

            <style jsx>{``}</style>
        </>
    );
}

export default PrettierConfigFileRow;
