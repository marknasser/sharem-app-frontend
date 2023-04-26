import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MdDownloadForOffline } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

import { client, urlFor } from "../../client";
import { MasonryLayout } from "../components";
import { pinDetailMorePinQuery, pinDetailQuery } from "../../utils/data";
import { Spinner } from "../components";
import { Discuss } from "react-loader-spinner";

function PinDetail({ user }) {
  const { pinId } = useParams();

  const [pins, setPins] = useState(null);
  const [pinDetail, setPinDetail] = useState(null);
  const [comment, setComment] = useState("");
  const [addindComment, setAddindComment] = useState(false);

  const addComment = () => {
    if (comment.trim().length > 0) {
      setAddindComment(true);
      client
        .patch(pinId)
        .setIfMissing({ comments: [] })
        .insert("after", "comments[-1]", [
          {
            comment,
            _key: uuidv4(),
            userId: user._id,
            postedBy: {
              _type: "postedBy",
              _ref: user._id,
            },
          },
        ])
        .commit()
        .then(() => {
          // window.location.reload();
          fetchPinDetails();
          setComment("");
          setAddindComment(false);
        });
    }
  };

  const fetchPinDetails = () => {
    let query = pinDetailQuery(pinId);
    if (query) {
      // fetching one pin detail
      client.fetch(query).then((data) => {
        setPinDetail(data[0]);

        if (data[0]) {
          // fetching all related pin detail
          query = pinDetailMorePinQuery(data[0]);
          client.fetch(query).then((res) => setPins(res));
        }
      });
    }
  };
  useEffect(() => {
    fetchPinDetails();
  }, [fetchPinDetails]);

  if (!pinDetail) return <Spinner message="Loading pin ... " />;
  return (
    <>
      <div
        className="flex xl:flex-row flex-col m-auto bg-white"
        style={{ maxWidth: "1500px", borderRadius: "32px" }}
      >
        <div className=" flex justify-center items-center md:items-start flex-initial ">
          <img
            src={pinDetail?.image && urlFor(pinDetail.image).url()}
            alt="pic"
            className="rounded-t-3xl rounded-b-lg"
          />
        </div>
        <div className="w-full p-5 flex-1 xl:min-w-620">
          <div className=" flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <a
                href={`${pinDetail.image?.asset?.url}?dl=`}
                download
                onClick={(e) => e.stopPropagation()} // because behind the button is the image and we don't need to redirect while clicking on the button
              >
                <MdDownloadForOffline className="bg-white w-9 h-9 rounded-full flex justify-center items-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none" />
              </a>
            </div>
            <a href={pinDetail.destination} target="_black" rel="noreferrer">
              {pinDetail.destination}
            </a>
          </div>
          <div>
            <h1 className="text-4xl font-bold break-words mt-3 ">
              {pinDetail.title}
            </h1>
            <p className="mt-3">{pinDetail.about}</p>
          </div>
          <Link
            to={`/user-profile/${pinDetail.postedBy?._id}`}
            className="flex gap-2 items-center bg-white mt-5 rounded-lg"
          >
            <img
              src={pinDetail.postedBy?.image}
              alt="user-profile"
              className="w-8 h-8 object-cover rounded-full"
            />
            <p className="capitalize font-semibold">
              {pinDetail.postedBy?.userName}
            </p>
          </Link>
          <h2 className="mt-5 text-2xl">Comments</h2>
          <div className="max-h-370 overflow-y-auto">
            {pinDetail?.comments?.map((comment, i) => (
              <div
                className="flex gap-2 mt-5 items-center bg-white rounded-lg"
                key={i}
              >
                <img
                  src={comment.postedBy.image}
                  alt="user-prof"
                  className="w-10 h-10 rounded-full cursor-pointer object-cover"
                />
                <div className="flex flex-col ">
                  <p className="font-bold">{comment.postedBy.userName}</p>
                  <p>{comment.comment}</p>
                </div>
              </div>
            ))}
          </div>
          <div className=" flex flex-wrap mt-6 gap-3 items-center">
            <Link to={`/user-profile/${pinDetail.postedBy?._id}`}>
              <img
                src={pinDetail.postedBy?.image}
                alt="user-profile"
                className="w-10 h-10 object-cover rounded-full cursor-pointer"
              />
            </Link>
            <input
              className="flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl  focus:border-gray-300"
              type="text"
              placeholder="Add a comment ..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              type="button"
              className="bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
              onClick={addComment}
            >
              {addindComment ? "posting the comment ..." : "post"}
            </button>
          </div>
        </div>
      </div>
      {pins?.length > 0 ? (
        <>
          <h2 className="text-center font-bold text-2xl mt-8 mb-4">
            More like this !
          </h2>
          <MasonryLayout pins={pins} />
        </>
      ) : (
        <Spinner message={"Loading more pins ...."} />
      )}
    </>
  );
}

export default PinDetail;
