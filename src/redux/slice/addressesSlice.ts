import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  content: IAddress[];
}
const initialState: InitialState = {
  content: [],
};

const addressesSlice = createSlice({
  name: "addresses",
  initialState,
  reducers: {
    setAddresses: (state, action) => {
      state.content = action.payload;
    },
  },
});

export const { setAddresses } = addressesSlice.actions;
export default addressesSlice.reducer;
