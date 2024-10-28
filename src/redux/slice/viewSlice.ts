import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  selectedView: null | string;
}

const initialState: InitialState = {
  selectedView: null,
};

const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    setView: (state, action: PayloadAction<string | null>) => {
      state.selectedView = action.payload;
    },
  },
});

export const { setView } = viewSlice.actions;
export default viewSlice.reducer;
