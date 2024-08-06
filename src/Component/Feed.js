import { useEffect, useState } from "react";
import axios from "axios";
import NewsLayout from "./NewsLayout";

function Feed({ searchForTopic }) {
  const cart = [];
  const [headline, setHeadline] = useState("");

  const getHeadline = async () => {
    try {
      await axios
        .get(
          "https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=3e38b3e884e141d09f220a0c3d9769e2"
        )
        .then((res) => {
          setHeadline(res.data.articles[0].title);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getHeadline();
  }, []);

  return (
    <div>
      <h1 className="text-4xl text-center font-semibold my-6 tracking-wider">
        {headline}
      </h1>
      <NewsLayout newsByTopic={searchForTopic} />
    </div>
  );
}

export default Feed;
