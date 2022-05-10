import type { NextPage } from 'next';
import InputFile from '@components/input-file/InputFile';

const Home: NextPage = () => {
    return (
        <div>
            <InputFile acceptableExtensionList={['.prettierrc']} />
        </div>
    );
};

export default Home;
