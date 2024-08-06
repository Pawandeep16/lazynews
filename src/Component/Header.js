import React, { useContext, useState } from "react";
import { SearchIcon, ShoppingCartIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import { countryCode, language_code } from "../Constant/Functions";
import { UserContext } from "../Context/UserContext";
import { useDispatch, useSelector } from "react-redux";

function Header() {
  const navigation = useNavigate();

  const { isUser } = useContext(UserContext);
  const userDetail = useSelector((state) => state.newsReducer);

  const dispatch = useDispatch();

  const [language, setLanguage] = useState(language_code[0]);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    dispatch({
      type: "CHANGE_LANGUAGE",
      payload: e.target.value,
    });
  };

  const fetchBreakingNews = async () => {
    try {
      const response = await fetch(
        "https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=3e38b3e884e141d09f220a0c3d9769e2"
      );
      const data = await response.json();
      console.log(data);
      // Navigate to the breaking news page and pass the data
      navigation("/breaking-news", { state: { news: data.articles } });
    } catch (error) {
      console.error("Error fetching breaking news:", error);
    }
  };

  return (
    <div className="flex items-center justify-between space-x-3 bg-gray-900 px-4 py-4">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl text-white font-semibold">My NEWS</h1>
        <div>
          <p className="text-white">🍁Canada</p>
        </div>
      </div>
      {isUser && (
        <div className="p-1 border border-gray-700 flex items-center justify-between space-x-2 flex-1 rounded-md bg-gray-800">
          <select className="p-2 bg-gray-700 text-white" name="" id="">
            <option value="">All</option>
            {countryCode.map((item) => (
              <option key={item} value={item} className="text-black">
                {item}
              </option>
            ))}
          </select>
          <input
            className="flex-1 outline-none bg-gray-800 text-white"
            type="text"
            placeholder="Search your favourite"
          />
          <SearchIcon className="h-6 text-white" />
        </div>
      )}
      <div className="flex items-center justify-evenly space-x-4">
        <select
          value={language}
          onChange={handleLanguageChange}
          className="bg-transparent text-white border-0 outline-none"
          name=""
          id=""
        >
          {language_code.map((item) => (
            <option key={item} className="text-black" value={item}>
              {item}
            </option>
          ))}
        </select>
        <p
          className="text-white cursor-pointer hover:text-yellow-500 transition duration-300 ease-in-out transform hover:scale-105"
          onClick={fetchBreakingNews}
        >
          Top Breaking News
        </p>
        <p
          className="text-white cursor-pointer hover:text-yellow-500 transition duration-300 ease-in-out transform hover:scale-105"
          onClick={() => navigation("/login")}
        >
          {isUser
            ? `Welcome ${userDetail?.userDetail?.username || "User"}`
            : `Login/SignUp`}
        </p>
      </div>
    </div>
  );
}

export default Header;
