import url from 'url'
import React from 'react'
import fetch from 'isomorphic-unfetch'
import TimeTable from '../components/TimeTable/TimeTable.js';
import Layout from '../components/Layout.js'

const absoluteUrl = (req, setLocalhost) => {
    let protocol = 'https'
    let host = req ? req.headers.host : window.location.hostname
    if (host.indexOf('localhost') > -1) {
        if (setLocalhost) host = setLocalhost
        protocol = 'http'
    }

    return url.format({
        protocol,
        host,
        pathname: '/' // req.url
    })
};



const DepartureTimes = (props) => {
    return (
        <Layout>
            <TimeTable tableData={props.departureTimes}></TimeTable>
        </Layout>
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
