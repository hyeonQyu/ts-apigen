import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <title>ts-apigen</title>
                    <meta charSet="utf-8" />
                    <body>
                        <div id={'portal'} />
                        <Main />
                        <NextScript />
                    </body>
                </Head>
            </Html>
        );
    }
}
