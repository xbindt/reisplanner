import React, {Fragment, useState} from 'react';
import fetch from 'isomorphic-unfetch';
import {minutesToHoursAndMinutes, transformToReadableDate, transformToReadableDelay} from '../utils/DateHelper';
import Layout from '../components/Layout';
import Trip from '../components/Trip';
import Head from 'next/head';
import uuid from 'uuid/v4';
import { withRouter } from 'next/router'

import { absoluteUrl } from '../utils/UrlHelper';
import { Grid, Cell } from 'styled-css-grid';

const Trips = (props) => {
    const [open, setOpen] = useState({boolOpen:false, tripI:0});
    return (
        <Fragment>
        <Head>
            <title>Trips</title>
        </Head>
        <Layout>
                {
                    props.trips.trips.map((trip, index) => {
                    const departureLeg = trip.legs[0].origin;
                    const arrivalLeg = trip.legs[trip.legs.length-1].destination;
                    return (
                        <Fragment key={ uuid() }>
                            <Grid columns={4} onClick={(e) => {setOpen({boolOpen:true, tripI:index})}}>
                                <Cell>{transformToReadableDate(departureLeg.plannedDateTime)} {transformToReadableDelay(departureLeg.actualDateTime, departureLeg.plannedDateTime)}</Cell>
                                <Cell>{transformToReadableDate(arrivalLeg.plannedDateTime)}</Cell>
                                <Cell>{minutesToHoursAndMinutes(trip.actualDurationInMinutes)}</Cell>
                                <Cell>{departureLeg.actualTrack ? (
                                    <span className="spoorwijziging-true">{departureLeg.actualTrack}</span>
                                ) : (departureLeg.plannedTrack)}
                                </Cell>
                                <Cell>{trip.status}</Cell>
                            </Grid>
                            {(open.boolOpen && open.tripI===index) && (
                                <Trip {...trip} />
                            )
                            }
                        </Fragment>
                    );
                })}
        </Layout>
        </Fragment>
    )
};

Trips.getInitialProps = async ({query, req }) => {
    const { fromStation, toStation } = query
    /* NOTE - relative url in this function runs will not work and
    will get ECONNRESET error since it runs on server context */
    const baseUrl = absoluteUrl(req, 'localhost:9999');
    const apiUrl = `${baseUrl}api/trips/?fromStation=${fromStation}&toStation=${toStation}`;

    const res = await fetch(apiUrl);
    const data = await res.json();
    return { trips: data }
};


export default withRouter(Trips);
