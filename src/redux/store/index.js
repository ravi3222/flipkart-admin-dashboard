import { applyMiddleware, createStore } from "redux";
import rootReducer from "../reducers";
import thunk from "redux-thunk";
import logger from "redux-logger";

const middlewares = [thunk, logger];
const store = createStore(rootReducer, applyMiddleware(...middlewares));
console.log(store.getState());
export default store;
