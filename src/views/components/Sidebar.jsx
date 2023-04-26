import React from "react";
import logo from "../../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { categories } from "../../utils/data";

const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize";
const isActiveStyle =
  "flex items-center px-5 gap-3 font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize";

function Sidebar({ user, closeToggle }) {
  const handleCloseSidebar = () => {
    if (closeToggle) {
      closeToggle(false);
    }
  };
  return (
    <div className="relative flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
      <div className="flex flex-col ">
        <Link to="/" className="w-190 px-5 my-6" onClick={handleCloseSidebar}>
          <img src={logo} alt="logo" className="w-full" />
        </Link>

        <div className="flex flex-col gap-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            <RiHomeFill />
            Home
          </NavLink>

          <h3 className="mt-2 px-5 text-base 2xl:text-xl">
            Discover cateogries
          </h3>

          {categories.slice(0, categories.length - 1).map((cat) => (
            <NavLink
              to={`category/${cat.name}`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              onClick={handleCloseSidebar}
              key={cat.name}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-8 h-8 object-cover rounded-full shadow-sm"
              />
              <span className="capitalize"> {cat.name}</span>
            </NavLink>
          ))}
        </div>
      </div>
      {user && (
        <Link
          to={`user-profile/${user._id}`}
          className=" right-0 flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"
          onClick={handleCloseSidebar}
        >
          <img
            src={user.image}
            className="w-10 h-10 rounded-full object-cover"
            alt="user-profile"
          />
          <p>{user.userName}</p>
          <IoIosArrowForward />
        </Link>
      )}
    </div>
  );
}

export default Sidebar;
