import axios from "../../helpers/axios";
import { authConstants } from "./constants";

export const login = (user) => {
  console.log("user", user);

  return async (dispatch) => {
    await axios
      .post(`/admin/signin`, {
        ...user,
      })
      .then((response) => {
        console.log("Login Successful", response.data);
      })
      .catch((error) => {
        console.log("Oops, Request failed!");
      });

    dispatch({
      type: authConstants.LOGIN_REQUEST,
      payload: {
        ...user,
      },
    });
  };
};
