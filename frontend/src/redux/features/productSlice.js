import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    productData: [],
    loginToken: "",
    loading: false,
    error: null,
  },
  reducers: {
    registerRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.loginToken = action.payload.data.access_token;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    fetchProductsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess: (state, action) => {
      state.loading = false;
      state.productData = action.payload;
    },
    fetchProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    addProductsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    addProductsSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    addProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteProductsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteProductsSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    deleteProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  addProductsRequest,
  addProductsSuccess,
  addProductsFailure,
  deleteProductsRequest,
  deleteProductsSuccess,
  deleteProductsFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
} = productSlice.actions;
export default productSlice.reducer;
