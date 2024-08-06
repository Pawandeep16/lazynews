import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import { UserContext } from "./Context/UserContext";
import BreakingPage from "./Pages/breaking-news";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/breaking-news" element={<BreakingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
