import React, { useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import "./Loader.css";

function Loader() {

  const an = () => {
    const statusText = document.querySelector(".status-text");
    const subText = document.querySelector(".sub-text");

    const statusMessages = [
      "Searching...",
      "Processing query...",
      "Fetching results...",
      "Almost there...",
    ];

    const subMessages = [
      "Waiting for search response",
      "Connecting to servers",
      "Analyzing data",
      "Preparing results",
    ];

    let messageIndex = 0;

    // Cycle through different status messages
    setInterval(() => {
      messageIndex = (messageIndex + 1) % statusMessages.length;
      statusText.style.opacity = "0";
      subText.style.opacity = "0";

      setTimeout(() => {
        statusText.textContent = statusMessages[messageIndex];
        subText.textContent = subMessages[messageIndex];
        statusText.style.opacity = "0.9";
        subText.style.opacity = "0.7";
      }, 300);
    }, 3000);

    // Add some random glow effects
    const magnifyingGlass = document.querySelector(".magnifying-glass");
    setInterval(() => {
      magnifyingGlass.style.boxShadow = "0 0 20px rgba(255, 255, 255, 0.5)";
      setTimeout(() => {
        magnifyingGlass.style.boxShadow = "none";
      }, 500);
    }, 4000);
  };

  useEffect(()=>{
    an()
  },[])
  return (
    <div className="search-loader-container">
      <div className="progress-ring">
        <svg className="progress-circle">
          <circle className="progress-path" cx="60" cy="60" r="45"></circle>
          <circle className="progress-bar-path" cx="60" cy="60" r="45"></circle>
        </svg>
      </div>

      <div className="search-icon">
        <div className="magnifying-glass"></div>
        <div className="search-waves">
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
        </div>
      </div>

      <div className="status-text">Searching...</div>

      <div className="typing-indicator">
        <div className="typing-dot"></div>
        <div className="typing-dot"></div>
        <div className="typing-dot"></div>
      </div>

      <div className="sub-text">Waiting for search response</div>

      <div className="network-dots">
        <div className="network-dot"></div>
        <div className="network-dot"></div>
        <div className="network-dot"></div>
        <div className="network-dot"></div>
        <div className="network-dot"></div>
      </div>
    </div>
  );
}

export default Loader;
