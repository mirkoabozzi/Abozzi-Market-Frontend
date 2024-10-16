import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  paymentLoading: boolean;
}

const initialState: InitialState = {
  paymentLoading: false,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPaymentLoading: (state, action: PayloadAction<boolean>) => {
      state.paymentLoading = action.payload;
    },
  },
});

export const { setPaymentLoading } = paymentSlice.actions;
export default paymentSlice.reducer;
