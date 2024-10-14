import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IWeather } from "../../interfaces/IWeather";

interface InitialState {
  weather: IWeather | null;
}

const initialState: InitialState = {
  weather: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setWeather: (state, action: PayloadAction<IWeather>) => {
      state.weather = action.payload;
    },
  },
});

export const { setWeather } = weatherSlice.actions;
export default weatherSlice.reducer;
