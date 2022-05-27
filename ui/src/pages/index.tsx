import Home from '@components/home/home';
import { HomeApi } from '@requests/apis/homeApi';
import { Config } from '@defines/config';

export interface IndexProps {
    config: Config;
}

function Index(props: IndexProps) {
    const { config } = props;
    return <Home config={config} />;
}

export async function getServerSideProps() {
    const { config } = await HomeApi.getConfig();
    return {
        props: { config },
    };
}

export default Index;
