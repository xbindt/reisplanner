import React from 'react'
import styled from 'styled-components';

   const TimeTable = (props) => {

    const transformToReadableDate = (date) => {
        const nwDate = new Date(date);
        const minutes =  (nwDate.getMinutes() < 10 ? '0' : '') + nwDate.getMinutes();
        return `${nwDate.getHours()} : ${minutes}`;
    }

    const transformToReadableDelay = (actual, planned) => {
       const delay = Math.ceil((new Date(actual) - new Date(planned))/60000);
       return delay > 0 ? `+ ${delay}` : '';
    }

    const TimeTable = styled.table`
        border-collapse: collapse;
        th {
            text-align: left;
            padding: 10px 10px 10px 0;
            font-family: ${props => props.theme.fontsecondary};
            position: sticky;
            top: 0;
            z-index: 10;
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
    `

   return (
    <div>
        <TimeTable>
            <thead>
                <tr>
                    <th>Vertrektijd</th>
                    <th>Eindbestemming</th>
                    <th>Spoor</th>
                </tr>
            </thead>
            <tbody>
            {props.tableData.map((departureTime) => {
                return(
                    <tr key={departureTime.product.number}>
                        <td>
                            {transformToReadableDate(departureTime.plannedDateTime)}
                            <span className="warning">{transformToReadableDelay(departureTime.actualDateTime, departureTime.plannedDateTime)}</span>
                        </td>
                        <td>
                            {departureTime.direction}
                            {
                                departureTime.messages === undefined ? '' : departureTime.messages.map(
                                    (message, index) => {
                                        return(
                                            <>
                                                <br/>
                                                <sup
                                                    key = {index}
                                                    className={message.style.toLowerCase()}
                                                >
                                                    {message.message}
                                                </sup>
                                            </>
                                            )
                                    }
                                )
                            }
                        </td>
                        <td className="departuretime">
                            {departureTime.actualTrack ? (
                                <span className="spoorwijziging-true">{departureTime.actualTrack}</span>
                            ) : (departureTime.plannedTrack)}
                        </td>
                    </tr>
                );
            })}
            </tbody>
        </TimeTable>
    </div>
    );
}

export default TimeTable