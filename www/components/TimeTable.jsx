import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { transformToReadableDate, transformToReadableDelay } from '../utils/DateHelper';

const TimesTable = styled.table`
  border-collapse: collapse;
  th {
      text-align: left;
      padding: 10px 10px 10px 0;
      font-family: ${props => props.theme.fontsecondary};
      position: sticky;
      top: 0;
      z-index: 8;
      background: ${props => props.theme.basebackgroundcolor};
  }
  td {
      vertical-align: top;
      padding: 10px 10px 10px 0;
  }
  .warning {
      color: red;
  }
  .spoorwijziging-true {
      color: red;
      padding: 0;
      margin: 0;
      display: block;
      transform: rotate(15deg);
  }
  .departuretime {
      text-align: center;
  }
`;
const TimeTable = ({ tableData }) => (
  <div>
    <TimesTable>
      <thead>
        <tr>
          <th>Vertrektijd</th>
          <th>Eindbestemming</th>
          <th>Spoor</th>
        </tr>
      </thead>
      <tbody>
        {tableData && tableData.map(departureTime => (
          <tr key={uuidv4()}>
            <td>
              {transformToReadableDate(departureTime.plannedDateTime)}
              <span className="warning">{transformToReadableDelay(departureTime.actualDateTime, departureTime.plannedDateTime)}</span>
            </td>
            <td>
              {departureTime.direction}
              {
                  departureTime.messages && departureTime.messages.map(message => (
                    <p key={uuidv4()} className={message.style.toLowerCase()}>
                      {message.message}
                    </p>
                  ))
                }
            </td>
            <td className="departuretime">
              {departureTime.actualTrack ? (
                <span className="spoorwijziging-true">{departureTime.actualTrack}</span>
              ) : (departureTime.plannedTrack)}
            </td>
          </tr>
        ))}
      </tbody>
    </TimesTable>
  </div>
);

TimeTable.propTypes = {
  tableData: PropTypes.arrayOf().isRequired,
};

TimeTable.defaultProps = {};

export default TimeTable;
