import url from 'url'
import React, { useState } from 'react'
import Link from 'next/link'
import 'isomorphic-unfetch'
import Layout from '../components/Layout.js'
import styled from 'styled-components';
import Head from 'next/head'

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

const AutoComplete = styled.ul`
    list-style: none;
    border: solid 1px ${props => props.theme.basecolor};
    margin: 0;
    padding: 0;
    width: 100%;

    li {
        padding: 0;
        margin: 0;

        a {
            color: ${props => props.theme.basecolor};
            display: block;
            padding: 0.5em 1em;
            text-decoration: none;
        }
    }
`

const InputSearch = styled.input`
    font-family: ${props => props.theme.fontbase};
    font-size: 1em;
    width: 100%;
    padding: 15px;
    background: transparent;
    outline: none;
    color: ${props => props.theme.basecolor};
    border: solid 1px ${props => props.theme.basecolor};
`


const Home = (props) => {

    const [stationsFiltered, setStationsFiltered] = useState([]);

    const autoComplete = (event) => {
        event.preventDefault();
        let autoCompleteInput = event.currentTarget.value;
        if(autoCompleteInput.length > 2 ) {
            let filterdStations = props.stations.filter((station) => {
                if(station.land.toLowerCase() === 'nl'){
                    return station.namen.lang.toLowerCase().includes(autoCompleteInput.toLowerCase())
                        || station.synoniemen.join().toLowerCase().includes(autoCompleteInput.toLowerCase());
                }
            });
            setStationsFiltered(filterdStations);
        }

        if(autoCompleteInput.length === 0 ) {
            setStationsFiltered([]);
        }
    }

    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <Layout>
                <label htmlFor="station">Station</label>
                <div>
                    <InputSearch id="station" type="text" autoComplete="off" placeholder="Typ uw station hier..." onKeyUp={(e) => autoComplete(e)} />
                    <AutoComplete>
                    {
                        stationsFiltered.map((station) => {
                            return (
                                <li key={station.code} >
                                    <Link
                                        href={{pathname: '/departuretimes', query: { station: station.code }}}
                                        as={`/departuretimes/${station.code}`}>
                                        <a>{station.namen.lang}</a>
                                    </Link>
                                </li>
                            );
                            }
                        )
                    }
                    </AutoComplete>
                </div>
            </Layout>
        </>
    )
};

Home.getInitialProps = async ({ req }) => {
    /* NOTE - relative url in this function runs will not work and
    will get ECONNRESET error since it runs on server context */
    const baseUrl = absoluteUrl(req, 'localhost:3000');
    const apiUrl = process.env.NODE_ENV === 'production' ? `${baseUrl}api/stations` : 'http://localhost:9999/api/stations';

    const res = await fetch(apiUrl)
    const data = await res.json()
    return { stations: data.payload }

};


export default Home;
