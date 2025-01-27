import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type viewType = "category" | "discount" | "priceRange" | "mainSearch" | null

interface InitialState {
  selectedView: viewType
}

const initialState: InitialState = {
  selectedView: null,
};

const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    setView: (state, action: PayloadAction<viewType>) => {
      state.selectedView = action.payload;
    },
  },
});

export const { setView } = viewSlice.actions;
export default viewSlice.reducer;
