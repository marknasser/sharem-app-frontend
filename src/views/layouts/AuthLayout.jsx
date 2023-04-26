import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../../store/state/Auth/reducer";
import { Navigate } from "react-router-dom";

function AuthLayout({ children }) {
  const dispatch = useDispatch();
  console.log("asdasd ");
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const logoutHandler = useCallback(() => {
    dispatch(authAction.logout());
  }, []);

  const now = new Date().getTime();
  const expirationDate = new Date(localStorage.getItem("expirationDate"));
  const remainingTime = expirationDate - now;

  // to dispatch logout automatically depends on timer when u open the app
  useEffect(() => {
    setTimeout(() => {
      logoutHandler();
    }, remainingTime);
  }, [remainingTime, logoutHandler]);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return <div>{children}</div>;
}

export default AuthLayout;
