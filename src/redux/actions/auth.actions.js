import axios from "../../helpers/axios";
import { authConstants } from "./constants";

export const login = (user) => {
  console.log("user", user);

  return async (dispatch) => {
    dispatch({ type: authConstants.LOGIN_REQUEST });
    const res = await axios.post(`/admin/signin`, {
      ...user,
    });
    // .then((response) => {
    //   console.log("Login Successful", response.data);
    // })
    // .catch((error) => {
    //   console.log("Oops, Request failed!");
    // });

    if (res.status === 200) {
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: token,
        user,
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};
