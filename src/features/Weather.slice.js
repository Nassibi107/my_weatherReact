
import { createSlice } from "@reduxjs/toolkit";

const initailSatates  = {
   weather  : [{icon :undefined}],
   clouds : undefined,
    main: {
      temp : undefined
    },
    name: undefined,
    sys: {
      country : undefined,
      sunrise : undefined
    },
    wind: {
      speed : undefined
    }
};

export const WeatherSlice = createSlice ({
   name : 'Weather',
   initialState : initailSatates,
   reducers : {
      setWhdata : (state , action) => {
         const  {clouds, main, name, sys, weather, wind} = action.payload
         state.clouds = clouds
         state.main= main
         state.name= name
         state.sys= sys
         state.weather= weather
         state.wind= wind
      }
   }

})


export const  {setWhdata} = WeatherSlice.actions

export default WeatherSlice.reducer;
