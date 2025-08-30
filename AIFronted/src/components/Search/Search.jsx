import { FaX } from "react-icons/fa6";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FaCircle, FaArrowUp, FaPlusCircle } from "react-icons/fa";
import axios from "axios";

import "./Search.css";
import GeminiOutput from "../Response/Response";
import Loader from "../Loader/Loader";
import { storeContext } from "../../StoreContext/StoreContext";



const Search = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const {response, setResponse, setToken, url} = useContext(storeContext)



  const bottomRef = useRef(null);


  useEffect(() => {
    if (loading && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [loading]);


  const autoResize = () => {
    const textarea = document.querySelector("textarea");
    textarea.style.height = "auto"; // Reset the height to auto to shrink
    textarea.style.height = textarea.scrollHeight + "px"; // Set the height to scrollHeight
  };


  // handle search
  

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post(`${url}/response`, {
        search,
      });
      setResponse((prev) => [
        ...prev,
        { question: result.data.question, answer: result.data.answer},
      ]);
      setSearch([]);
      setLoading(false);
    } catch (err) {
      setLoading(false)
      console.log("Error is ", err);
    }
  };


  return (
    <div className="main-container">
      <div className="response-container">
        {response.length > 0 ? (
          <div className="markdown-wrapper">
            {response.map((item, index) => (
              <GeminiOutput
                key={index}
                response={item.answer.split("\n")}
                question={item.question}
                interval={50}
              />
            ))}
            <div ref={bottomRef} />
            {loading && <Loader />}
          </div>
        ) : (
          <div>
            <h1 style={{ textAlign: "center" }}>Ask AI</h1>
            {loading && <Loader />}
          </div>
        )}
      </div>
      <div className="searching">
        <textarea
          value={search}
          name="search"
          id=""
          placeholder="Search the web..."
          onChange={(e) => setSearch(e.target.value)}
          onInput={autoResize}
        ></textarea>
        <div className="searching-buttons">
          <button style={{cursor:"none"}}>{}</button>
          <button
            style={{ cursor: loading ? "not-allowed" : "pointer"}}
            onClick={handleSearch}
          >
            {loading ? <FaCircle className="loader" /> : <FaArrowUp />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
