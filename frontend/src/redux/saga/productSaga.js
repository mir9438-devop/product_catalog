import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  registerRequest,
  registerSuccess,
  registerFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  addProductsRequest,
  addProductsSuccess,
  addProductsFailure,
  deleteProductsRequest,
  deleteProductsSuccess,
  deleteProductsFailure,
} from "../features/productSlice";
import { Toaster, toast } from "react-hot-toast";
import Router from "next/router";

// worker saga

function* register(action) {
  try {
    // Replace with your real API URL
    // const response = yield call(
    //   axios.get,
    //   `${process.env.NEXT_PUBLIC_API_URL}/products`
    // );

    const response = yield call(
      axios.post,
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      action.payload
    );
    if (response.data.code == 201) {
      toast.success("Registration successful");
      Router.push("/auth/login");
    }

    yield put(registerSuccess(response.data));
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message;
    toast.error(errorMsg);
    yield put(registerFailure(error.response?.data?.message || error.message));
  }
}

function* login(action) {
  try {
    // Replace with your real API URL
    // const response = yield call(
    //   axios.get,
    //   `${process.env.NEXT_PUBLIC_API_URL}/products`
    // );

    const response = yield call(
      axios.post,
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      action.payload
    );

    const { access_token, user } = response.data.data;
    localStorage.setItem("token", access_token);
    loginSuccess(access_token);
    Router.push("/dashboard");

    // Axios wraps response -> response.data contains actual payload
    yield put(loginSuccess(response.data));
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message;
    toast.error(errorMsg);
    yield put(loginFailure(error.response?.data?.message || error.message));
  }
}

function* fetchProduct(action) {
  try {
    // Replace with your real API URL
    // const response = yield call(
    //   axios.get,
    //   `${process.env.NEXT_PUBLIC_API_URL}/products`
    // );
    const search = action.payload?.search || "";
    const response = yield call(
      axios.get,
      `${process.env.NEXT_PUBLIC_API_URL}/products?search=${search}`
    );
    // Axios wraps response -> response.data contains actual payload
    yield put(fetchProductsSuccess(response.data));
  } catch (error) {
    yield put(
      fetchProductsFailure(error.response?.data?.message || error.message)
    );
  }
}

function* addProduct(action) {
  const { data, callBack } = action.payload;

  try {
    // Get token from localStorage
    const token = localStorage.getItem("token");

    const response = yield call(
      axios.post,
      `${process.env.NEXT_PUBLIC_API_URL}/products`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 201) {
      callBack();
      Router.push("/dashboard");
    }

    // Dispatch success with the created product
    yield put(addProductsSuccess(response.data));
  } catch (error) {
    yield put(
      addProductsFailure(error.response?.data?.message || error.message)
    );
  }
}

function* deleteProduct(action) {
  const { data, callBack } = action.payload;
  try {
    // Get token from localStorage
    const token = localStorage.getItem("token");
    const response = yield call(
      axios.delete,
      `${process.env.NEXT_PUBLIC_API_URL}/products/${action.payload.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      callBack();
    }

    // Dispatch success with the created product
    yield put(deleteProductsSuccess(response.data));
  } catch (error) {
    yield put(
      deleteProductsFailure(error.response?.data?.message || error.message)
    );
  }
}

// watcher saga
export default function* productSaga() {
  yield takeLatest(loginRequest.type, login);
  yield takeLatest(registerRequest.type, register);
  yield takeLatest(fetchProductsRequest.type, fetchProduct);
  yield takeLatest(addProductsRequest.type, addProduct);
  yield takeLatest(deleteProductsRequest.type, deleteProduct);
}
