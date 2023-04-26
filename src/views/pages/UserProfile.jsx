import { useState, useEffect } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";
import { GoogleLogout } from "react-google-login";
import { useDispatch } from "react-redux";
import { authAction } from "../../store/state/Auth/reducer";

import { client } from "../../client";
import {
  userQuery,
  userCreatedPinsQuery,
  userSavedPinsQuery,
} from "../../utils/data";

import { MasonryLayout, Spinner } from "../components";

const activeBtnStyles =
  "bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none";
const notActiveBtnStyles =
  "bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none";

function UserProfile() {
  const [user, setUser] = useState({});
  const [pins, setPins] = useState([]);
  const [text, setText] = useState("Created");
  const [activeBtn, setActiveBtn] = useState("created");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();

  const User =
    localStorage.getItem("user") !== "undefined"
      ? localStorage.getItem("user")
      : localStorage.clear();

  useEffect(() => {
    const query = userQuery(userId);
    client.fetch(query).then((response) => setUser(response[0]));
  }, [userId]);

  useEffect(() => {
    if (text === "Created") {
      // fetch user created user
      const createdPinsQuery = userCreatedPinsQuery(userId);
      client.fetch(createdPinsQuery).then((response) => {
        console.log();
        setPins(response);
      });
    } else {
      //fetch user saved pins
      const savedPinsQuery = userSavedPinsQuery(userId);
      client.fetch(savedPinsQuery).then((response) => setPins(response));
    }
  }, [text, userId]);

  const logout = () => {
    dispatch(authAction.logout());
  };

  if (!user) return <Spinner message="Loading profile" />;

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              src="https://source.unsplash.com/1600x800/?nature,photography,technology"
              alt="user-pic"
              className="w-full h-370 2xl:h-510 shadow-lg object-cover"
            />
            <img
              src={user.image}
              alt="user-pic"
              className="w-20 h-20 rounded-full object-cover -mt-10 shadow-xl"
            />
          </div>
          <h1 className="font-bold text-3xl text-center mt-3 capitalize">
            {user.userName}
          </h1>
          <div className="absolute top-0 z-1 right-0 p-2">
            {userId === User && (
              <button
                type="button"
                className=" bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
                onClick={logout}
              >
                <AiOutlineLogout color="red" fontSize={21} />
              </button>
            )}
          </div>
        </div>
        <div className="text-center mb-7">
          <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn("created");
            }}
            className={`${
              activeBtn === "created" ? activeBtnStyles : notActiveBtnStyles
            }`}
          >
            Created
          </button>
          <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn("saved");
            }}
            className={`${
              activeBtn === "saved" ? activeBtnStyles : notActiveBtnStyles
            }`}
          >
            Saved
          </button>
        </div>

        <div className="px-2">
          <MasonryLayout pins={pins} />
        </div>

        {pins?.length === 0 && (
          <div className="flex justify-center font-bold items-center w-full text-xl mt-2">
            No Pins Found!
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;

{
  /* {userId === User.googleId && (
  <GoogleLogout
    clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
    render={(renderProps) => (
      <button
        type="button"
        className=" bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
        onClick={renderProps.onClick}
        disabled={renderProps.disabled}
      >
        <AiOutlineLogout color="red" fontSize={21} />
      </button>
    )}
    onLogoutSuccess={logout}
    cookiePolicy="single_host_origin"
  />
)} */
}
