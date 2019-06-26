import url from 'url'
import React from 'react'
import fetch from 'isomorphic-unfetch'
import TimeTable from '../components/timeTable/TimeTable';
import Layout from '../components/Layout'
import Head from 'next/head'

import { absoluteUrl } from '../utils/UrlHelper';

const DepartureTimes = (props) => {
    return (
        <>
        <Head>
            <title>Vertrektijden</title>
        </Head>
        <Layout>
            <TimeTable tableData={props.departureTimes}></TimeTable>
        </Layout>
        </>
    )
};

DepartureTimes.getInitialProps = async ({query, req }) => {
    const { station } = query
    /* NOTE - relative url in this function runs will not work and
    will get ECONNRESET error since it runs on server context */
    const baseUrl = absoluteUrl(req, 'localhost:9999');
    const apiUrl = `${baseUrl}api/departures/?station=${station}`;

    const res = await fetch(apiUrl);
    const data = await res.json();

    return { departureTimes: data.payload.departures }

};


export default DepartureTimes;
