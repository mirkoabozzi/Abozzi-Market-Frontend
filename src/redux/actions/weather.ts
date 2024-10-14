import { Dispatch } from "@reduxjs/toolkit";
import { setWeather } from "../slice/weatherSlice";

const weatherKey = import.meta.env.VITE_WEATHER_KEY;
const lat = 40.852266;
const lon = 8.815716;

export const getWeather = () => {
  return async (dispatch: Dispatch) => {
    try {
      const resp = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + weatherKey);
      if (resp.ok) {
        const result = await resp.json();
        dispatch(setWeather(result));
      } else {
        throw new Error("Get weather error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
