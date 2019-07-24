import React, {Fragment} from 'react';
import uuid from 'uuid/v4';
import {transformToReadableDate} from '../utils/DateHelper';
import Message from '../components/Message';
import { Grid, Cell } from 'styled-css-grid';

const Trip = (props) => {
    const departureLeg = props.legs[0].origin;
    const arrivalLeg = props.legs[props.legs.length-1].destination;
    return(
        <Fragment>
            {props.legs.map((leg) => {
                return (
                    <Grid columns={3} key={ uuid()}>
                        <Cell>{leg.origin.name } {transformToReadableDate(leg.origin.plannedDateTime)}</Cell>
                        <Cell>-></Cell>
                        <Cell>{leg.destination.name} {transformToReadableDate(leg.destination.plannedDateTime)}</Cell>
                        <Cell>{leg.messages.map(message => (<Message key={ uuid()} {...message} /> ))}</Cell>
                    </Grid>
                )
            })}
        </Fragment>
    )
};


export default Trip;
