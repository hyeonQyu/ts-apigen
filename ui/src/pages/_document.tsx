import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <meta charSet="utf-8" />
                    <link href="https://spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css" rel="stylesheet" type="text/css" />
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
