import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";

import { urlFor, client } from "../../client";
import { fetchUser } from "../../utils/fetchUser";

function Pin({ pin }) {
  const { postedBy, image, _id, destination } = pin;
  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);

  const navigate = useNavigate();
  const userInfo = fetchUser();
  // console.log("saveee", pin?.save);

  let alreadySaved = pin?.save?.filter(
    (item) => item?.postedBy?._id === userInfo
  );

  alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];
  const deletePin = (id) => {
    client.delete(id).then(() => {
      window.location.reload();
    });
  };
  const savePin = (id) => {
    if (alreadySaved?.length === 0) {
      setSavingPost(true);

      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: uuidv4(),
            userId: userInfo,
            postedBy: {
              _type: "postedBy",
              _ref: userInfo,
            },
          },
        ])
        .commit()
        .then(() => {
          setTimeout(() => {
            window.location.reload();
            setSavingPost(false);
          }, 3000);
        });
    }
  };
  return (
    <div className="m-2">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
        className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        <img
          src={urlFor(image).width(250).url()}
          alt="user-post"
          className="rounded-lg w-full"
        />

        {postHovered && (
          <div
            className="absolute top-0 w-full h-full flex flex-col justify-between p-2 pl-1 z-50"
            style={{ height: "100%" }}
          >
            <div className="flex items-center justify-between ">
              <div className="flex gap-2">
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()} // because behind the button is the image and we don't need to redirect while clicking on the button
                >
                  <MdDownloadForOffline className="bg-white w-9 h-9 rounded-full flex justify-center items-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none" />
                </a>
              </div>
              {alreadySaved?.length !== 0 ? (
                <button
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {pin?.save?.length} Saved
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                >
                  {pin?.save?.length} {savingPost ? "Saving" : "Save"}
                </button>
              )}
            </div>
            <div className="flex justify-between items-center gap-2 w-full">
              {destination && (
                <a
                  href={destination}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white flex  items-center gap-2  text-black font-bold p-2 px-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                >
                  <BsFillArrowUpRightCircleFill />
                  {destination.length > 15
                    ? destination.slice(0, 15)
                    : destination + "..."}
                </a>
              )}
              {postedBy?._id === userInfo && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePin(_id);
                  }}
                  type="button"
                  className="bg-white opacity-70 hover:opacity-100 text-dark p-2 font-bold  text-base rounded-3xl hover:shadow-md outline-none"
                >
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <Link
        to={`/user-profile/${postedBy?._id}`}
        className="flex gap-2 items-center p-1 mt-2"
      >
        <img
          src={postedBy?.image}
          alt="user-profile"
          className="w-8 h-8 object-cover rounded-full"
        />
        <p className="capitalize font-semibold">{postedBy?.userName}</p>
      </Link>
    </div>
  );
}

export default Pin;

// 1, [1,2,3] -> [1].length -> 1 -> !1 -> true
// 4, [1,2,3] -> [1].length -> 1 -> !1 -> false
