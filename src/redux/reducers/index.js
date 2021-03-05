import { combineReducers } from "redux";
import authReducer from "./auth.reducers";
import categoryReducer from "./category.reducers";
import productReducer from "./product.reducers";
import userReducer from "./user.reducer";
import pageReducer from "./page.reducers";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  category: categoryReducer,
  product: productReducer,
  // order: orderReducer,
  page: pageReducer,
});

export default rootReducer;
