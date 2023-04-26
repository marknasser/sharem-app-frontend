import { createSlice } from "@reduxjs/toolkit";
//helper function for token's init value
const retrieveStoredToken = () => {
  const now = new Date();
  const expirationDate = new Date(localStorage.getItem("expirationDate"));
  const duration = expirationDate - now.getTime();

  if (duration <= 60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  } else {
    return { savedToken: localStorage.getItem("token"), duration };
  }
};
// timer to clear after logout
let timerLogin;

const initialValue = {
  token: retrieveStoredToken()?.savedToken,
  isLoggedIn: !!retrieveStoredToken()?.savedToken,
  errorMessage: null,
};

const authReducer = createSlice({
  name: "auth",
  initialState: initialValue,
  reducers: {
    login_success: (state, action) => {
      //expirationDate
      const expirationDate = new Date(
        new Date().getTime() + +action.payload.expiresIn * 1000
      );
      //set state && localStorage
      console.log("sucesss loigin", action.payload);
      state.token = action.payload.idToken;
      state.isLoggedIn = true;
      localStorage.setItem("token", action.payload.idToken);
      localStorage.setItem("expirationDate", expirationDate.toISOString());

      //set timer for logging out
      const remainingTime = expirationDate.getTime() - new Date().getTime();
      timerLogin = setTimeout(() => {
        state.token = null;
        state.isLoggedIn = false;
        localStorage.removeItem("token");
        localStorage.removeItem("expirationTime");
      }, remainingTime);
    },
    login_failed: (state, action) => {
      state.token = null;
      state.isLoggedIn = false;
      state.errorMessage = action.payload;
    },
    login_pending: () => {},
    signup: (state, action) => {},
    logout: (state) => {
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
      localStorage.removeItem("expirationTime");
      localStorage.removeItem("user");
      if (timerLogin) clearTimeout(timerLogin);
    },
  },
});

export const authAction = authReducer.actions;
export default authReducer.reducer;
