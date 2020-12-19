import { authConstants } from "../actions/constants";

const initialState = {
  name: "Ravi",
};

const authReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      state = {
        ...state,
      };
      break;

    default:
      return state;
  }
  return state;
};

export default authReducer;
