import React, { useState, Fragment} from 'react';
import styled from 'styled-components';

const AutoCompleteList = styled.ul`
    list-style: none;
    border: solid 1px ${props => props.theme.basecolor};
    border-top: none;
    margin: 0;
    padding: 0;
    position: absolute;
    background-color:${props => props.theme.basebackgroundcolor};

    li {
        padding: 0;
        margin: 0;

        span {
            color: ${props => props.theme.basecolor};
            display: block;
            padding: 0.5em 1em;
            text-decoration: none;
            &:hover{
                color: ${props => props.theme.basehovercolor};
                background-color: ${props => props.theme.basehoverbackgroundcolor};
            }
        }
    }
`

const InputSearch = styled.input`
    font-family: ${props => props.theme.fontbase};
    font-size: 1em;
    width: 100%;
    padding: 15px;
    background: transparent;
    color: ${props => props.theme.basecolor};
    border: solid 1px ${props => props.theme.basecolor};
`

const SearchBox = (props) => {
    const [stationsFiltered, setStationsFiltered] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const autoComplete = (event) => {
        let autoCompleteInput = event
        if(autoCompleteInput.length > 2 ) {
            let filterdStations = props.stations.filter((station) => {
                return station.namen.lang.toLowerCase().includes(autoCompleteInput.toLowerCase())
                    || station.synoniemen.join().toLowerCase().includes(autoCompleteInput.toLowerCase());
            });
            setStationsFiltered(filterdStations);
        }

        if(autoCompleteInput.length === 0 ) {
            setStationsFiltered([]);
        }
    }

    const handleChange = (event) => {
        setInputValue(event.target.value);
        autoComplete(event.target.value);
    }

    const handleBlur = (inputName, station) => {
        props.funcOnBlur(inputName, station)
    }

    return (
        <Fragment>
            <label htmlFor={props.name}>{props.label}</label>
            <div>
                <InputSearch value={inputValue} id={props.name} name={props.name} type="text" autoComplete="off" placeholder="Typ uw station hier..." onChange={handleChange} />
                <AutoCompleteList>
                {
                    stationsFiltered.map((station) => {;
                        return (
                            <li key={station.code} >
                                <span onClick={(e) => {handleBlur(props.name, station); setInputValue(station.namen.lang); setStationsFiltered([]);} }>{station.namen.lang}</span>
                            </li>
                        );
                    }
                    )
                }
                </AutoCompleteList>
            </div>
        </Fragment>
    )
};

export default SearchBox;
