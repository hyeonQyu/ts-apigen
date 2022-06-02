import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import CommonInPortal from '@components/common/common-in-portal/commonInPortal';
import { RecoilRoot } from 'recoil';
import { useEffect } from 'react';
import { HomeApi } from '@requests/apis/homeApi';
import { Default } from '@defines/default';

function MyApp({ Component, pageProps }: AppProps) {
    const queryClient = new QueryClient();

    useEffect(() => {
        const portString = document.getElementById('port')?.getAttribute('value');
        HomeApi.setPort(portString ? Number(portString) : Default.PORT);
    }, []);

    return (
        <RecoilRoot>
            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
                <CommonInPortal />
            </QueryClientProvider>
        </RecoilRoot>
    );
}

export default MyApp;
