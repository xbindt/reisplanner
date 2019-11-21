import React from 'react';
import fetch from 'isomorphic-unfetch';
import Layout from '../components/Layout';
import Head from 'next/head';

import { absoluteUrl } from '../utils/UrlHelper';

const TestGrapQL = (props) => {
    return (
        <>
        <Head>
            <title>Vertrektijden</title>
        </Head>
        <Layout>
        {
            JSON.stringify(props.stations)
        }
        </Layout>
        </>
    )
};

TestGrapQL.getInitialProps = async ({query, req }) => {
    const { station } = query
    /* NOTE - relative url in this function runs will not work and
    will get ECONNRESET error since it runs on server context */
    const baseUrl = absoluteUrl(req, 'localhost:3000');
    const apiUrl = process.env.NODE_ENV === 'production' ? `${baseUrl}graphql/` : 'http://localhost:8888/graphql';

    const res = await fetch(apiUrl,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: '{ stations { code names{lang middel} synoniemen} }' }),
    });
    const response = await res.json();
    return { stations: response.data };

};


export default TestGrapQL;