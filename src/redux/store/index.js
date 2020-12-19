import { applyMiddleware, createStore } from "redux";
import rootReducer from "../reducers";
import thunk from "redux-thunk";

const store = createStore(rootReducer, applyMiddleware(thunk));
console.log(store.getState());
export default store;
