import React, {Fragment} from 'react';
import fetch from 'isomorphic-unfetch';
import TimeTable from '../components/timeTable/TimeTable';
import Layout from '../components/Layout';
import Head from 'next/head';


import { absoluteUrl } from '../utils/UrlHelper';

const Departures = (props) => {

    return (
        <Fragment>
            <Head>
                <title>Vertrektijden</title>
            </Head>
            <Layout>
                <TimeTable tableData={props.departures}></TimeTable>
            </Layout>
        </Fragment>
    )
};

Departures.getInitialProps = async ({query, req }) => {
    const { station } = query;
    const baseUrl = absoluteUrl(req, 'localhost:3000');
    const apiUrl = process.env.NODE_ENV === 'production' ? `${baseUrl}graphql/` : 'http://localhost:8888/graphql';

    const res = await fetch(apiUrl,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: `{ departures(code: "${station}") { plannedDateTime actualDateTime messages {style message } direction actualTrack plannedTrack }}` }),
    });
    const response = await res.json();
    return { departures: response.data.departures };

}
export default Departures;




