import React, { useState } from 'react';
import Head from 'next/head';

import { useRouter } from 'next/router';
import styled from 'styled-components';
import SearchBox from '../components/SearchBox';
import { absoluteUrl, jsonToRequestParams } from '../utils/UrlHelper';
import Layout from '../components/Layout';
import Loader from '../components/Loader';

const InputSearchBtn = styled.button`
  font-family: ${props => props.theme.fontbase};
  font-size: 1em;
  width: 100%;
  padding: 15px;
  background: rgba(0,0,0,0.2);
  color: ${props => props.theme.basecolor};
  border: solid 1px ${props => props.theme.basecolor};
`;

// const divStyle = styled(div)`
//   display: flex;
//   align-items: flex-end;
//   justify-content: flex-end;
// `;

function Home(props) {
  const router = useRouter();
  const [formState, setFormState] = useState({});
  const [formDepartureState, setFormDepartureState] = useState({});

  const onBlurHandler = (inputName, station) => {
    setFormState({
      ...formState,
      ...{
        [inputName]: station.namen.lang,
      },
    });
  };

  const onBlurHandlerDepartures = (inputName, station) => {
    setFormDepartureState({
      ...formDepartureState,
      ...{
        [inputName]: station.code,
      },
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    router.push(`/trips?${jsonToRequestParams(formState)}`);
  };
  const handleSubmitDepartures = event => {
    event.preventDefault();
    router.push(`/departures?${jsonToRequestParams(formDepartureState)}`);
  };

  return (
    <Loader>
      <Head>
        <title>Home</title>
      </Head>
      <Layout>
        <form onSubmit={handleSubmit} action="/trips">
          <h2>Trip</h2>
          <div>
            <div><SearchBox {...props} label="Van" name="fromStation" funcOnBlur={onBlurHandler} /></div>
            <div><SearchBox {...props} label="Naar" name="toStation" funcOnBlur={onBlurHandler} /></div>
            <div><InputSearchBtn>Plannen</InputSearchBtn></div>
          </div>
        </form>
        <form onSubmit={handleSubmitDepartures} action="/departures">
          <h2>Vertrektijden</h2>
          <div>
            <div><SearchBox {...props} label="Van" name="station" funcOnBlur={onBlurHandlerDepartures} /></div>
            <div><InputSearchBtn>Vertrektijden</InputSearchBtn></div>
          </div>
        </form>
      </Layout>
    </Loader>
  );
}

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
