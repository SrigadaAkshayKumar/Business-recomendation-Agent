import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const Main = ({ mode }) => {
  const [formData, setFormData] = useState({
    city: "",
    area: "",
    budget: "Low-Medium",
    businessIdea: "",
  });

  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setOutput("");

    try {
      const response = await axios.post(
        "/api/generate", //https://backend-agent-yaqo.onrender.com
        {
          mode,
          ...formData,
        }
      );

      setOutput(response.data.result);
    } catch (error) {
      console.error(error);
      setOutput("❌ Error: Unable to generate recommendation.");
    }

    setLoading(false);
  };

  return (
    <div className="form-container">
      <form className="app-container" onSubmit={handleSubmit}>
        {mode === "case1" ? (
          <>
            <label>City:</label>
            <input type="text" name="city" onChange={handleChange} required />

            <label>Area:</label>
            <input type="text" name="area" onChange={handleChange} required />

            <label>Budget Range:</label>
            <select name="budget" onChange={handleChange} defaultValue="">
              <option value="" disabled>
                Select one
              </option>
              <option value="Low-Medium">Low-Medium</option>
              <option value="Medium-High">Medium-High</option>
              <option value="High">High</option>
            </select>
          </>
        ) : (
          <>
            <label>Business Idea:</label>
            <input
              type="text"
              name="businessIdea"
              onChange={handleChange}
              required
            />

            <label>City/State:</label>
            <input type="text" name="city" onChange={handleChange} required />
          </>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Submit"}
        </button>
      </form>

      {output && (
        <div className="output-box">
          <h2>Agent Recommendation</h2>
          <ReactMarkdown
            children={output}
            components={{
              h1: ({ node, ...props }) => (
                <h1
                  style={{
                    fontSize: "1.5rem",
                    margin: "0",
                    lineHeight: "1",
                  }}
                  {...props}
                />
              ),
              h2: ({ node, ...props }) => (
                <h2
                  style={{
                    fontSize: "1.2rem",
                    margin: "0",
                    lineHeight: "1",
                  }}
                  {...props}
                />
              ),
              p: ({ node, ...props }) => (
                <p style={{ lineHeight: "1" }} {...props} />
              ),
              li: ({ node, ...props }) => (
                <li
                  style={{ marginLeft: "1.5rem", lineHeight: "1.2" }}
                  {...props}
                />
              ),
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Main;
