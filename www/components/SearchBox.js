import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const AutoCompleteList = styled.ul`
    list-style: none;
    border: solid 1px ${props => props.theme.basecolor};
    border-top: none;
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


const SearchBox = (props) => {
    const [stationsFiltered, setStationsFiltered] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const autoComplete = (event) => {
        let autoCompleteInput = event
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

    const handleChange = (event) => {
        setInputValue(event.target.value);
        autoComplete(event.target.value);
    }

    const handleBlur = (station) => {
        props.funcOnBlur(station)
    }

    return (
        <>
        <label htmlFor="station">Station</label>
        <div>
            <InputSearch value={inputValue} id="station" name={props.name} type="text" autoComplete="off" placeholder="Typ uw station hier..." onChange={handleChange.bind(this)} />
            <AutoCompleteList>
            {
                stationsFiltered.map((station) => {
                    return (
                        <li key={station.code} >
                            <span onClick={(e) => {handleBlur(station), setInputValue(station.namen.lang); setStationsFiltered([]);} }>{station.namen.lang}</span>
                        </li>
                    );
                }
                )
            }
            </AutoCompleteList>
        </div>
        </>
    )
};

export default SearchBox;
