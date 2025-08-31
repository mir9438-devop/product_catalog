import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import userReducer from "../features/productSlice";
import productSaga from "../saga/productSaga";
import { all } from "redux-saga/effects";

// combine sagas (useful if you add more later)
function* rootSaga() {
  yield all([productSaga()]);
}

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
