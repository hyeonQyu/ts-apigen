import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import CommonInPortal from '@components/common/common-in-portal/commonInPortal';
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps }: AppProps) {
    const queryClient = new QueryClient();
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
