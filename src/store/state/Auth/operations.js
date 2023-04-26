import axios from "axios";
import { authAction } from "./reducer";

export const userLogin = (credentials) => {
  const { email, password } = credentials;
  return async (dispatch) => {
    dispatch(authAction.login_pending());
    await axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCQkA1PTawgevwn44jSV1MUXACHwK-nyUg",
        { email: email, password: password, returnSecureToken: true }
      )
      .then((res) => {
        dispatch(authAction.login_success(res.data));
        return res.data;
      })
      .catch((error) => {
        // [2] response Error
        const errorMSM =
          error.response?.data.error.message || "Authentication Failed";
        dispatch(authAction.login_failed(errorMSM));
      });
  };
};

export const userSignup = (credentials) => {
  const { email, password } = credentials;
  return async (dispatch) => {
    dispatch(authAction.login_pending());
    await axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCQkA1PTawgevwn44jSV1MUXACHwK-nyUg",
        { email: email, password: password, returnSecureToken: true }
      )
      .then((res) => {
        console.log("resss", res.data);
        dispatch(authAction.login_success(res.data));
        //////////////////////////////
      })
      .catch((error) => {
        const errorMSM =
          error.response?.data.error.message || "Authentication Failed";
        dispatch(authAction.login_failed(errorMSM));
      });
  };
};
