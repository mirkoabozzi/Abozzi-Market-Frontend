import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  content: IAddress[];
  addressChoice: IAddressAdd | null;
}
const initialState: InitialState = {
  content: [],
  addressChoice: null,
};

const addressesSlice = createSlice({
  name: "addresses",
  initialState,
  reducers: {
    setAddresses: (state, action: PayloadAction<IAddress[]>) => {
      state.content = action.payload;
    },
    setAddressChoice: (state, action: PayloadAction<IAddress>) => {
      state.addressChoice = action.payload;
    },
    clearAddressChoice: (state) => {
      state.addressChoice = null;
    },
  },
});

export const { setAddresses, setAddressChoice, clearAddressChoice } = addressesSlice.actions;
export default addressesSlice.reducer;
