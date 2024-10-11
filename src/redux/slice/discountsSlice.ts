import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  content: DiscountListItem[];
}

const initialState: InitialState = {
  content: [],
};

const discountSlice = createSlice({
  name: "discounts",
  initialState,
  reducers: {
    setDiscounts: (state, action) => {
      state.content = action.payload;
    },
  },
});

export const { setDiscounts } = discountSlice.actions;
export default discountSlice.reducer;
