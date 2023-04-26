import { useEffect, useState } from "react";
import MasonryLayout from "./MasonryLayout";
import { client } from "../../client";
import { feedQuery, searchQuery } from "../../utils/data";
import Spinner from "./Spinner";

function Search({ searchTerm }) {
  const [pins, setPins] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (searchTerm) {
      const query = searchQuery(searchTerm.toLowerCase());
      client.fetch(query).then((response) => {
        setPins(response);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((response) => {
        setPins(response);
        setLoading(false);
      });
    }
  }, [searchTerm]);

  if (loading || !pins) return <Spinner message={"Searching for pins ..."} />;
  return (
    <div>
      {pins?.length === 0 && searchTerm !== "" && !loading && (
        <div className="mt-10 text-center text-xl">No Found !</div>
      )}
      {<MasonryLayout pins={pins} />}
    </div>
  );
}

export default Search;
