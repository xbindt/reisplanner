import React from 'react';
import 'isomorphic-unfetch';
import Layout from '../components/Layout';
import Head from 'next/head';
import { absoluteUrl } from '../utils/UrlHelper';
import SearchBox from '../components/SearchBox';
import { Grid, Cell } from "styled-css-grid";



const Home = (props) => {

    const onBlurHandler = (station) => {
        console.log(station);
    }

    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <Layout>
                <form>
                    <Grid columns="repeat(auto-fit, minmax(320px,1fr))">
                        <Cell><SearchBox {...props} funcOnBlur={onBlurHandler} name="fromStation"/></Cell>
                        <Cell><SearchBox {...props} funcOnBlur={onBlurHandler} name="toStation" /></Cell>
                    </Grid>
                </form>
            </Layout>
        </>
    )
};
{/* <Link
href={{pathname: '/departuretimes', query: { station: station.code }}}
as={`/departuretimes/${station.code}`}>
<a>{station.namen.lang}</a>
</Link> */}

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
