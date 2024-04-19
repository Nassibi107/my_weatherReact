import {Button, Form} from "react-bootstrap";
import styles from  './SearchBar.module.scss'
import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setWhdata } from "../../features/Weather.slice";

export const SearchBar = () => {

    const [cityApi, setcityApi] = useState([]);
    const [units, setUnits] = useState('metric');
    const dispatch = useDispatch();
    const GEO_API_KEY = process.env.REACT_APP_GEO_API_KEY
    const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API
    const handleInputChange = (e) => {
        const {value} = e.currentTarget
        fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&type=city&format=json&apiKey=${GEO_API_KEY}`)
            .then(response => response.json())
            .then(json => setcityApi(json.results?.map(data => {
                const {lat, lon, city, country, formatted} = data
                return {lat, lon, city, country, formatted}
            })))
    }

    const hundle_select = (e, value) =>
    {
        const {lat,lon} = value

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&units=${units}&lon=${lon}&appid=${WEATHER_API_KEY}`)
            .then(response => response.json())
            .then(json => {
                 const {clouds, main, name, sys, weather, wind} = json
                dispatch(setWhdata({clouds, main, name, sys, weather, wind}));
            })

    }
    return (
        <>
            <div
                className={styles.searchContainer}>
                <Autocomplete className={styles.searchInput}
                            clearOnBlur ={false}
                            onChange={hundle_select}
                            getOptionLabel={(option) => option.formatted}
                              renderInput={(params) =>
                                  <TextField    onChange={handleInputChange} {...params}
                                             label={'Enter your city ...'}  />}
                                             options={cityApi || ["xx"]}

                            />

                <Button  variant="contained"> serche</Button>
            </div>
        </>
    )
}
