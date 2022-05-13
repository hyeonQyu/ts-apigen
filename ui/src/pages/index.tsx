import InputFile from '@components/input-file/inputFile';
import { PrettierConfig } from '../defines/prettierConfig';

function Home() {
    return (
        <div>
            <InputFile<PrettierConfig>
                acceptableExtensionList={['.prettierrc']}
                isFileJson
                onChangeFileContent={(fileContent) => console.log(fileContent)}
            />
        </div>
    );
}

export default Home;
