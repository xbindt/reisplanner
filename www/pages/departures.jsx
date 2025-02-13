import React from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-unfetch';
import Head from 'next/head';
import TimeTable from '../components/TimeTable';
import Layout from '../components/Layout';
import Loader from '../components/Loader';

import { absoluteUrl } from '../utils/UrlHelper';

const Departures = ({ departures }) => (
  <Loader>
    <Head>
      <title>Vertrektijden</title>
    </Head>
    <Layout>
      <TimeTable tableData={departures} />
    </Layout>
  </Loader>
);

Departures.propTypes = {
  departures: PropTypes.arrayOf().isRequired,
};

Departures.getInitialProps = async ({ query, req }) => {
  const { station } = query;
  const baseUrl = absoluteUrl(req, 'localhost:3000');
  const apiUrl = process.env.NODE_ENV === 'production' ? `${baseUrl}graphql/` : 'http://localhost:8888/graphql';

  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: `{ departures(code: "${station}") { plannedDateTime actualDateTime messages {style message } direction actualTrack plannedTrack }}` }),
  });
  const response = await res.json();
  return { departures: response.data.departures };
};

export default Departures;
