import React, { Fragment } from 'react';
import uuid from 'uuid/v4';
import { Grid, Cell } from 'styled-css-grid';
import styled from 'styled-components';
import { transformToReadableDate, transformToReadableDelay } from '../utils/DateHelper';
import Message from './Message';
import Delay from './Delay';

const Row = styled.div`
    padding: 1em;
    color: ${props => props.theme.basecolor};
    border: solid 1px ${props => props.theme.basecolor};
    `;

const Trip = props => (
  <Row>
    {props.legs.map(leg => (
      <Grid columns={3} key={uuid()}>
        <Cell>
          {leg.origin.name }
          <br />
          {transformToReadableDate(leg.origin.plannedDateTime)}
          {' '}
          <Delay>{transformToReadableDelay(leg.origin.actualDateTime, leg.origin.plannedDateTime)}</Delay>
        </Cell>
        <Cell center>-></Cell>
        <Cell>
          {leg.destination.name}
          <br />
          {transformToReadableDate(leg.destination.plannedDateTime)}
          {' '}
          <Delay>{transformToReadableDelay(leg.destination.actualDateTime, leg.destination.plannedDateTime)}</Delay>
        </Cell>
        {leg.messages.length > 0 && (<Cell width={3}>{leg.messages.map(message => (<Message key={uuid()} {...message} />))}</Cell>)}
      </Grid>
    ))}
  </Row>
);


export default Trip;
