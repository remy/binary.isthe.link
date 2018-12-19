import App, { Container } from 'next/app';
import Head from 'next/head';
import Layout from '../components/Layout';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return {
      pageProps,
    };
  }

  render() {
    const { pageProps } = this.props;
    let { Component } = this.props;

    return (
      <Container>
        <Head>
          <title>Binary 'n Bits</title>
          <link
            href="https://fonts.googleapis.com/css?family=Ubuntu+Mono"
            rel="stylesheet"
          />
          <meta name="viewport" content="width=device-width" />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Container>
    );
  }
}

export default MyApp;
