import { userConstants } from "../actions/constants";

const initialState = {
  error: null,
  message: "",
  loading: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.SIGNUP_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case userConstants.SIGNUP_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case userConstants.SIGNUP_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;

    default:
      return state;
  }
  return state;
};

export default userReducer;
