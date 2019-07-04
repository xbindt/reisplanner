import React from 'react';
import fetch from 'isomorphic-unfetch';
import Layout from '../components/Layout';
import Head from 'next/head';

import { absoluteUrl } from '../utils/UrlHelper';

const Trips = (props) => {
    return (
        <>
        <Head>
            <title>Trips</title>
        </Head>
        <Layout>

        </Layout>
        </>
    )
};

Trips.getInitialProps = async ({query, req }) => {
    console.log(query,"-------------------");
    const { fromStation, toStation } = query
    /* NOTE - relative url in this function runs will not work and
    will get ECONNRESET error since it runs on server context */
    const baseUrl = absoluteUrl(req, 'localhost:9999');
    const apiUrl = `${baseUrl}api/trips/?fromStation=${fromStation}&toStation=${toStation}`;

    const res = await fetch(apiUrl);
    const data = await res.json();
console.log(data);
    return { trips: data.payload }

};


export default Trips;
