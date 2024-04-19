import { configureStore } from "@reduxjs/toolkit";
import WeatherSlice from "../../features/Weather.slice";



export const Store = configureStore({
   reducer : {
      weather : WeatherSlice
   }
})
