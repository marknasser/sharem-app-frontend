import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "../../client";
import { MasonryLayout, Search, Spinner } from "./";
import { searchQuery, feedQuery } from "../../utils/data";

function Feed() {
  const { categoryId } = useParams();
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null);

  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      setLoading(true);

      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId]);

  if (loading)
    return <Spinner message={"We are adding new ideas to your feed!"} />;

  if (!pins?.length) return <h2>No pins available ...</h2>;

  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
}

export default Feed;

// useEffect(() => {
//   if (categoryId) {
//     setLoading(true);
//     const query = searchQuery(categoryId);
//     (async (query) => {
//       setLoading(true);
//       await client
//         .fetch(query)
//         .then((data) => {
//           console.log("dataaaa search", data);
//           setLoading(false);
//           setPins(data);
//         })
//         .catch((err) => {});
//     })();
//   } else {
//     setLoading(true);
//     client
//       .fetch(feedQuery)
//       .then((data) => {
//         console.log("search home", data);
//         setLoading(false);
//         setPins(data);
//       })
//       .catch((err) => {});
//   }
// }, [categoryId]);
