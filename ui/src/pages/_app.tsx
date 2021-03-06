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
        <>
            <RecoilRoot>
                <QueryClientProvider client={queryClient}>
                    <Component {...pageProps} />
                    <CommonInPortal />
                </QueryClientProvider>
            </RecoilRoot>

            <style jsx global>{`
                input {
                    width: 100%;
                    height: 40px;
                    outline: none;
                    border: none;
                    border-radius: 40px;
                    padding: 0 20px;
                    background-color: #e5ecef;
                    transition: 0.3s;
                    color: #585858;
                    font-size: 16px;
                }

                input:focus {
                    background-color: #f3f7f8;
                    color: #444444;
                }

                input::placeholder {
                    color: #afafaf;
                }
            `}</style>
        </>
    );
}

export default MyApp;
