import React, { useState } from 'react';
import fetch from 'isomorphic-unfetch';
import Head from 'next/head';
import uuid from 'uuid/v4';
import styled from 'styled-components';
import { withRouter } from 'next/router';
import { Grid, Cell } from 'styled-css-grid';
import { minutesToHoursAndMinutes, transformToReadableDate, transformToReadableDelay } from '../utils/DateHelper';
import Layout from '../components/Layout';
import Trip from '../components/Trip';
import Delay from '../components/Delay';

import { absoluteUrl } from '../utils/UrlHelper';
import Loader from '../components/Loader';

const Row = styled.div`
    margin-bottom: 1em;
    &:last-child {
        margin-bottom: 0;
    }
`;

const Trips = props => {
  const [open, setOpen] = useState({ boolOpen: false, tripIndex: -1 });

  return (
    <Loader>
      <Head>
        <title>Trips</title>
      </Head>
      <Layout>
        {
          props.trips && props.trips.map((trip, index) => {
            const departureLeg = trip.legs[0].origin;
            const arrivalLeg = trip.legs[trip.legs.length - 1].destination;
            return (
              <Row key={uuid()}>
                <Grid columns={5} onClick={() => { setOpen({ boolOpen: true, tripIndex: index }); }}>
                  <Cell>
                    {transformToReadableDate(departureLeg.plannedDateTime)}
                    {' '}
                    <Delay>{transformToReadableDelay(departureLeg.actualDateTime, departureLeg.plannedDateTime)}</Delay>
                  </Cell>
                  <Cell>
                    {transformToReadableDate(arrivalLeg.plannedDateTime)}
                    {' '}
                    <Delay>{transformToReadableDelay(arrivalLeg.actualDateTime, arrivalLeg.plannedDateTime)}</Delay>
                  </Cell>
                  <Cell>{minutesToHoursAndMinutes(trip.plannedDurationInMinutes)}</Cell>
                  <Cell>
                    {departureLeg.actualTrack ? (
                      <span className="spoorwijziging-true">{departureLeg.actualTrack}</span>
                    ) : (departureLeg.plannedTrack)}
                  </Cell>
                  <Cell>{trip.status}</Cell>
                </Grid>
                {
                  (open.boolOpen && open.tripIndex === index) && (
                    <Trip {...props.trips[open.tripIndex]} />
                  )
                }
              </Row>
            );
          })
        }
      </Layout>
    </Loader>
  );
};

Trips.getInitialProps = async ({ query, req }) => {
  const { fromStation, toStation } = query;
  const baseUrl = absoluteUrl(req, 'localhost:3000');
  const apiUrl = process.env.NODE_ENV === 'production' ? `${baseUrl}graphql/` : 'http://localhost:8888/graphql';
  const res = await fetch(apiUrl,{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: `{ trip(fromStation: "${fromStation}" toStation:"${toStation}") { uid status plannedDurationInMinutes legs{origin{name plannedDateTime actualDateTime actualTrack plannedTrack} destination{name plannedDateTime actualDateTime actualTrack plannedTrack}} }}` }),
  });
  const response = await res.json();
  return { trips: response.data.trip };
};


export default withRouter(Trips);
