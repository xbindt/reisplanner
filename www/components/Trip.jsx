import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import Grid, { Cell } from './CssGrid';
import { transformToReadableDate, transformToReadableDelay } from '../utils/DateHelper';
import Delay from './Delay';

const Row = styled.div`
    padding: 1em;
    color: ${props => props.theme.basecolor};
    border: solid 1px ${props => props.theme.basecolor};
    `;

const Trip = ({ legs }) => (
  <Row>
    {legs.map(leg => (
      <Grid columns={3} key={uuidv4()}>
        <Cell>
          {leg.origin.name }
          <br />
          {transformToReadableDate(leg.origin.plannedDateTime)}
          {' '}
          <Delay>{transformToReadableDelay(leg.origin.actualDateTime, leg.origin.plannedDateTime)}</Delay>
        </Cell>
        <Cell center>-&gt;</Cell>
        <Cell>
          {leg.destination.name}
          <br />
          {transformToReadableDate(leg.destination.plannedDateTime)}
          {' '}
          <Delay>{transformToReadableDelay(leg.destination.actualDateTime, leg.destination.plannedDateTime)}</Delay>
        </Cell>
      </Grid>
    ))}
  </Row>
);
Trip.propTypes = {
  legs: PropTypes.arrayOf().isRequired,
};

Trip.defaultProps = {};

export default Trip;
