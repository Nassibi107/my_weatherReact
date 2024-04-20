import {Button, Form} from "react-bootstrap";
import styles from  './SearchBar.module.scss'
import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setWhdata } from "../../features/Weather.slice";

export const SearchBar = () => {

    const [cityApi, setcityApi] = useState([]);
    const [units, setUnits] = useState('metric');
    const [geoLoaction, setGeoLoaction] = useState({long:0,lat:0});
    const dispatch = useDispatch();
    const GEO_API_KEY = process.env.REACT_APP_GEO_API_KEY
    const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API
    const getGeoLoaction = () => {
        navigator.geolocation.getCurrentPosition((p) => {

            setGeoLoaction (
                {
                    long: p.coords.longitude,
                     lat: p.coords.latitude,
                }
            )

        })
    }
    const getData = () => {
        if (geoLoaction)
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geoLoaction.lat}&units=${units}&lon=${geoLoaction.long}&appid=${WEATHER_API_KEY}`)
            .then(response => response.json())
            .then(json => {
                 const {clouds, main, name, sys, weather, wind} = json
                dispatch(setWhdata({clouds, main, name, sys, weather, wind}));
            })
    }
    useEffect ( () => {
            if (hasGeoLocation())
                getGeoLoaction();
    },[])
    useEffect (() => {
        getData();
    },[geoLoaction])
    const hasGeoLocation = () => {
        return navigator.geolocation;
    }
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
        setGeoLoaction (
            {
                long: lon,
                 lat: lat,
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

                <Button  variant="contained">  </Button>
            </div>
        </>
    )
}
