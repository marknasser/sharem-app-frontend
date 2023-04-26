import { useState, useEffect, useRef } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, Routes, Route } from "react-router-dom";

import { Sidebar } from "../components";
import { UserProfile, Pins } from "./";
import { client } from "../../client";
import { userQuery } from "../../utils/data";

import logo from "../../assets/logo.png";
import { fetchUser } from "../../utils/fetchUser";

function Home() {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);

  const userInfo = fetchUser();

  useEffect(() => {
    // const query = userQuery(userInfo?.googleId);
    const query = userQuery(userInfo);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col md:flex-row bg-gray-50  h-screen transaction-hight duration-75 ease-out">
      {/* large screen sidebar */}
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar user={user && user} />
      </div>

      {/* Navbar only in small screens */}
      <div className="flex md:hidden flex-row ">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu
            fontSize={40}
            className="cursor-pointer"
            onClick={() => {
              setToggleSidebar(true);
            }}
          />
          <Link to="/">
            <img src={logo} alt="logo" className="w-28" />
          </Link>
          <Link to={`/home/user-profile/${user?._id}`}>
            <img src={user?.image} alt="logo" className="w-28" />
          </Link>
        </div>
        {toggleSidebar && (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2 z-20">
              <AiFillCloseCircle
                fontSize={30}
                className="cursor-pointer"
                onClick={() => {
                  setToggleSidebar(false);
                }}
              />
            </div>
            {/* desktop sidebar */}
            <Sidebar user={user && user} closeToggle={setToggleSidebar} />
          </div>
        )}
      </div>
      <div className="pb-2 flex-1 h-screen overflow-y-scroll " ref={scrollRef}>
        {/* switch root  */}
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins user={user && user} />} />
          <Route />
        </Routes>
      </div>
    </div>
  );
}

export default Home;

//AN EMBTY ARRAY === COMMPONENTdIDMOUNT
