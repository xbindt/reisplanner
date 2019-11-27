import React, { useState, Fragment } from 'react';
import 'isomorphic-unfetch';
import Layout from '../components/Layout';
import Head from 'next/head';
import { absoluteUrl, jsonToRequestParams } from '../utils/UrlHelper';
import SearchBox from '../components/SearchBox';
import { Grid, Cell } from 'styled-css-grid';
import { useRouter } from 'next/router';
import styled from 'styled-components';


const Home = (props) => {
    const router = useRouter();
    const [formState, setFormState] = useState({});
    const [formDepartureState, setFormDepartureState] = useState({});

    const onBlurHandler = (inputName, station) => {
        setFormState({
            ...formState,
            ...{
                [inputName]: station.namen.lang
            }
        });
    }

    const onBlurHandlerDepartures = (inputName, station) => {
        setFormDepartureState({
            ...formDepartureState,
            ...{
                [inputName]: station.code
            }
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        router.push('/trips?' + jsonToRequestParams(formState));
    }
    const handleSubmitDepartures = (event) => {
        event.preventDefault();
        router.push('/departures?' + jsonToRequestParams(formDepartureState));
    }

    const InputSearchBtn = styled.button`
        font-family: ${props => props.theme.fontbase};
        font-size: 1em;
        width: 100%;
        padding: 15px;
        background: transparent;
        color: ${props => props.theme.basecolor};
        border: solid 1px ${props => props.theme.basecolor};
    `

    return (
        <Fragment>
            <Head>
                <title>Home</title>
            </Head>
            <Layout>
                <form onSubmit={handleSubmit} action="/trips">
                    <h2>Trip</h2>
                    <Grid columns="repeat(auto-fit,minmax(320px,1fr))">
                        <Cell><SearchBox {...props} label="Van" name="fromStation" funcOnBlur={onBlurHandler} /></Cell>
                        <Cell><SearchBox {...props} label="Naar" name="toStation" funcOnBlur={onBlurHandler} /></Cell>
                        <Cell><InputSearchBtn>Plannen</InputSearchBtn></Cell>
                    </Grid>
                </form>
                <form onSubmit={handleSubmitDepartures} action="/departures">
                    <h2>Vertrektijden</h2>
                    <Grid columns="repeat(auto-fit,minmax(320px,1fr))">
                        <Cell><SearchBox {...props} label="Van" name="station" funcOnBlur={onBlurHandlerDepartures} /></Cell>
                        <Cell><InputSearchBtn>Vertrektijden</InputSearchBtn></Cell>
                    </Grid>
                </form>
            </Layout>
        </Fragment>
    )
};
{/* <Link
href={{pathname: '/departuretimes', query: { station: station.code }}}
as={`/departuretimes/${station.code}`}>
<a>{station.namen.lang}</a>
</Link> */}

Home.getInitialProps = async ({ req }) => {
    const baseUrl = absoluteUrl(req, 'localhost:3000');
    const apiUrl = process.env.NODE_ENV === 'production' ? `${baseUrl}graphql/` : 'http://localhost:8888/graphql';

    const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: '{ stations { code namen{lang middel} synoniemen} }' }),
    });
    const response = await res.json();
    return { stations: response.data.stations };

};

export default Home;
