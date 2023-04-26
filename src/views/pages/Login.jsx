import { Navigate } from "react-router-dom";
import { useState } from "react";
import shareVideo from "../../assets/share.mp4";
import logo from "../../assets/logowhite.png";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../store/state/Auth/operations";
import { FormLogin } from "../components";

function Login() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [data, setData] = useState();

  const onSubmit = (credentials) => {
    dispatch(userLogin(credentials));
    setData(credentials);
  };

  if (isLoggedIn) {
    const generatedId = data.email.replace(/[^a-zA-Z0-9]/g, "0");
    localStorage.setItem("user", generatedId);

    return <Navigate to="/" />;
  }

  return (
    <div className="flex justify-start items-start flex-col h-screen bg-slate-500">
      <div className="relative w-full h-full">
        <video
          className="w-full h-full object-cover"
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 bottom-0 left-0 bg-blackOverlay">
          <div className="p-5">
            <img className="w-32" src={logo} alt="logo" />
          </div>

          <div className="shadow-2xl bg-mainColor flex justify-start items-center p-3 rounded-lg  outline-none">
            <FormLogin onSubmit={onSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
// import GoogleLoging from "react-google-login";
// import { FcGoogle } from "react-icons/fc";

// const responseGoogle = (response) => {
//   localStorage.setItem("user", JSON.stringify(response?.profileObj));

//   const { name, googleId, imageUrl } = response.profile;
//   const doc = {
//     _id: googleId,
//     _type: "user",
//     userName: name,
//     image: imageUrl,
//   };
//   client.createIfNotExists(doc).then(() => {
//     navigate("/home", { replace: true });
//   });
// };

{
  /* <div className="shadow-2xl">
  <GoogleLoging
  clientId=""
  render={(renderProps) => (
      <button
        type="button"
        className="bg-mainColor flex justify-start items-center p-3 rounded-lg cursor-pointer outline-none"
        onClick={renderProps.onClick}
        disabled={renderProps.disabled}
      >
        <FcGoogle className="mr-4" /> Sign in with Google
      </button>
    )}
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy="single_host-origin"
  />
</div> */
}
