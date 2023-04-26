import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import shareVideo from "../../assets/share.mp4";
import logo from "../../assets/logowhite.png";
import { userSignup } from "../../store/state/Auth/operations";
import { FormSignup } from "../components";
import { client } from "../../client";
import { useState } from "react";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [data, setData] = useState();

  const onSubmit = (credentials) => {
    dispatch(userSignup(credentials));
    setData(credentials);
  };

  if (isLoggedIn) {
    const generatedId = data.email.replace(/[^a-zA-Z0-9]/g, "0");
    localStorage.setItem("user", generatedId);

    const doc = {
      _id: generatedId,
      _type: "user",
      userName: data.name,
      image:
        "https://allthings.how/content/images/size/w2000/wordpress/2020/10/allthings.how-how-to-change-your-profile-picture-on-google-meet-profile-photo.png",
    };
    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });

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
            <FormSignup onSubmit={onSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
