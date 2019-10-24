import React, {Fragment, useState, useEffect} from 'react';
import fetch from 'isomorphic-unfetch';
import {minutesToHoursAndMinutes, transformToReadableDate, transformToReadableDelay} from '../utils/DateHelper';
import Layout from '../components/Layout';
import Trip from '../components/Trip';
import Delay from '../components/Delay';
import Head from 'next/head';
import uuid from 'uuid/v4';
import styled from 'styled-components';
import { withRouter } from 'next/router'

import { absoluteUrl } from '../utils/UrlHelper';
import { Grid, Cell } from 'styled-css-grid';

const Row = styled.div`
    width: 100%;
    padding: 1em;
    background: transparent;
    outline: none;
    color: ${props => props.theme.basecolor};
    border: solid 1px ${props => props.theme.basecolor};
    background: white;
    cursor: pointer;
    margin-bottom: 1em;
    &:last-child {
        margin-bottom: 0;
    }
`

const Trips = (props) => {
    const [open, setOpen] = useState({boolOpen:false, tripIndex:-1});
    const [queryMatches, setQueryMatches] = useState(false);

    useEffect(() => {
        if (window && window.matchMedia('(min-width: 600px)').matches) {
            setQueryMatches(true);
        }
    }, []);

    return (
        <Fragment>
        <Head>
            <title>Trips</title>
        </Head>
        <Layout>
            {props.trips && (<Grid columns={queryMatches ? 2 : 1}>
                <Cell>
                {
                    props.trips.map((trip, index) => {
                        const departureLeg = trip.legs[0].origin;
                        const arrivalLeg = trip.legs[trip.legs.length-1].destination;
                        return (
                            <Row key={ uuid() }>
                                <Grid columns={4} onClick={(e) => {setOpen({boolOpen:true, tripIndex:index})}}>
                                    <Cell>{transformToReadableDate(departureLeg.plannedDateTime)} <Delay>{transformToReadableDelay(departureLeg.actualDateTime, departureLeg.plannedDateTime)}</Delay></Cell>
                                    <Cell>{transformToReadableDate(arrivalLeg.plannedDateTime)} <Delay>{transformToReadableDelay(arrivalLeg.actualDateTime, arrivalLeg.plannedDateTime)}</Delay></Cell>
                                    <Cell>{minutesToHoursAndMinutes(trip.actualDurationInMinutes)}</Cell>
                                    <Cell>{departureLeg.actualTrack ? (
                                        <span className="spoorwijziging-true">{departureLeg.actualTrack}</span>
                                    ) : (departureLeg.plannedTrack)}
                                    </Cell>
                                    <Cell>{trip.status}</Cell>
                                </Grid>
                                {
                                    (open.boolOpen && open.tripIndex === index) && !queryMatches && (
                                        <Trip {...props.trips[open.tripIndex]} />
                                    )
                                }
                            </Row>
                        );
                    }
                )}
                </Cell>
                <Cell>
                {
                    (open.boolOpen && open.tripIndex > -1 && open.tripIndex < props.trips.length) && queryMatches && (
                        <Trip {...props.trips[open.tripIndex]} />
                    )
                }
                </Cell>
            </Grid>)}
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
    return data;
};


export default withRouter(Trips);
