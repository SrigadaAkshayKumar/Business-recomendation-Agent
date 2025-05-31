import React, { useState } from "react";
import "./App.css";
import Main from "./components/Main";

function App() {
  const [mode, setMode] = useState("case1");
  const [key, setKey] = useState(0); // Add a key to force Main re-render

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setKey((prevKey) => prevKey + 1); // Change key => reset Main
  };

  return (
    <div>
      <section className="hero">
        <div className="hero-text">
          <h1>Welcome to Business Advisor Agent</h1>
          <h3>
            AI-powered business recommendation agent tailored to your city,
            budget, and interests — or explore where your idea can grow best.
          </h3>
        </div>
        <div className="container">
          <div className="mode-toggle">
            <button
              onClick={() => handleModeChange("case1")}
              className={mode === "case1" ? "active" : ""}
            >
              Business Recommendation
            </button>
            <button
              onClick={() => handleModeChange("case2")}
              className={mode === "case2" ? "active" : ""}
            >
              Location Recommendation
            </button>
          </div>
        </div>
      </section>

      <div>
        <Main key={key} mode={mode} /> {/* Add key here */}
      </div>

      <footer className="footer">
        <div className="social">
          <a href="https://www.linkedin.com/in/akshaykumarsrigada/">Linkedin</a>
          <a href="https://github.com/SrigadaAkshayKumar/Business-recomendation-Agent">
            GitHub
          </a>
        </div>
        <div>
          <p>&copy; 2025 Business AI Agent. Built with by Akshay Kumar</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
