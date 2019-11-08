import React from 'react';
import fetch from 'isomorphic-unfetch';
import { withRouter } from 'next/router'
import Layout from '../components/Layout';
import Head from 'next/head';

import { absoluteUrl } from '../utils/UrlHelper';

const GrapQL = (props) => {
    return (
        <>
        <Head>
            <title>Vertrektijden</title>
        </Head>
        <Layout>
        hallo
        {
            JSON.stringify(props.user.me)
        }
        </Layout>
        </>
    )
};

GrapQL.getInitialProps = async ({query, req }) => {
    const { station } = query
    /* NOTE - relative url in this function runs will not work and
    will get ECONNRESET error since it runs on server context */
    const baseUrl = absoluteUrl(req, 'localhost:8000');
    const apiUrl = `${baseUrl}graphql/`;

    const res = await fetch(apiUrl,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: '{ me { username } }' }),
    });
    const response = await res.json();
    console.log(response.data)
    return { user: response.data };

};


export default GrapQL;