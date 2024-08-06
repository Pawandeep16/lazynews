import React, { useContext, useEffect, useState } from "react";
import Header from "../Component/Header";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";

function Login() {
  const [signup, setSignup] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const { onUserAuthenticate } = useContext(UserContext);
  const dispatch = useDispatch();

  const registerHandler = async () => {
    try {
      await axios
        .post("http://localhost:5000/api/user/registerUser", {
          username: userName,
          password: password,
        })
        .then((res) => {
          dispatch({
            type: "ADD_USER_DETAIL",
            payload: res.data.user,
          });
          onUserAuthenticate();
          navigate("/");
        });
    } catch (err) {
      console.log(err);
    }
  };

  const loginHandler = async () => {
    try {
      await axios
        .post("http://localhost:5000/api/user/loggedInUser", {
          username: userName,
          password: password,
        })
        .then((res) => {
          dispatch({
            type: "ADD_USER_DETAIL",
            payload: res.data.user,
          });
          onUserAuthenticate();
          navigate("/");
        });
    } catch (err) {
      console.log(err);
    }
  };

  const getUsers = async () => {
    try {
      await axios.get("http://localhost:5000/api/user/getUsers").then((res) => {
        setUsers(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, [userName]);

  const exsistedUser = !!users.find((item) => item.username === userName);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-gray-100">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://static.vecteezy.com/system/resources/thumbnails/030/943/946/small_2x/world-map-background-news-studio-background-for-news-report-and-breaking-news-on-world-live-report-video.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">
          {signup ? "Welcome To the Lazy News " : "Welcome Back"}
        </h2>
        <h2 className="text-3xl font-bold mb-6 text-center">
          {signup ? "Sign Up" : "Login"}
        </h2>
        <div className="mb-4">
          <input
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#231F20]"
            type="text"
            placeholder="Enter Username"
          />
          {exsistedUser && signup && (
            <p className="text-red-600 mt-2">Username already taken</p>
          )}
        </div>
        <div className="mb-6">
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#231F20]"
            type="password"
            placeholder="Enter Password"
          />
        </div>
        <button
          onClick={signup ? registerHandler : loginHandler}
          className="w-full bg-[#231F20] text-white py-2 rounded-md hover:bg-gray-800 transition duration-300"
        >
          {signup ? "Sign Up" : "Login"}
        </button>
        <div className="mt-4 text-center">
          {signup ? (
            <p>
              Already have an account?{" "}
              <span
                onClick={() => setSignup(false)}
                className="text-gray-800 cursor-pointer font-semibold "
              >
                Login
              </span>
            </p>
          ) : (
            <p>
              Don't have an account?{" "}
              <span
                onClick={() => setSignup(true)}
                className="text-blue-600 cursor-pointer font-semibold"
              >
                Sign Up
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
