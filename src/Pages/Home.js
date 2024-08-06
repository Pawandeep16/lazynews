import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../Component/Header";
import Banner from "../Component/Banner";
import Feed from "../Component/Feed";
import TopTopics from "../Component/TopTopics";

function Home() {
  let [string, setString] = useState([]);
  const [topic, setTopic] = useState("");

  const getData = async () => {
    try {
      await axios
        .get(`http://localhost:5000/api/getDefalutNews`)
        .then((res) => {
          setString(res.data);
        });
    } catch (error) {
      setString(error.message);
    }
  };

  console.log(topic);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Banner />
      <div className="container mx-auto px-4 py-8">
        <TopTopics topic={topic} setTopic={setTopic} />
        <Feed searchForTopic={topic} />
      </div>
    </div>
  );
}

export default Home;
