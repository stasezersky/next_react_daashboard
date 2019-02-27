

import Document, { Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <html>
                <Head>
                    <style>{`body { padding-top: 56px; } /* custom! */`}</style>
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                    <link rel="shortcut icon" href="/static/favicon.png" />
                    <link href="/static/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
                    <link href="/static/styles.css" rel="stylesheet" />
                </Head>
                <body className="custom_class">
                    <Main />
                    <NextScript />
                    <script src="/static/vendor/jquery/jquery.min.js"></script>
                    <script src="/static/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
                </body>
            </html>
        )
    }
}

export default MyDocument