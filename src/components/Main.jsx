import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { getPrompt } from "./prompts";

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

    const prompt = getPrompt(mode, formData);
    console.log("API key:", process.env.REACT_APP_GROK_API_KEY);

    try {
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_GROK_API_KEY}`,
          },
          body: JSON.stringify({
            model: "meta-llama/llama-4-scout-17b-16e-instruct",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
          }),
        }
      );

      const data = await response.json();
      console.log("Grok API response:", data); // <-- Debug

      if (data.choices && data.choices.length > 0) {
        setOutput(data.choices[0].message.content);
      } else if (data.error) {
        setOutput(`❌ API Error: ${data.error.message}`);
      } else {
        setOutput("⚠️ No valid response received.");
      }
    } catch (error) {
      console.error(error);
      setOutput("❌ Error: Unable to generate response.");
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
                  style={{ fontSize: "1.5rem", margin: "0", lineHeight: "1" }}
                  {...props}
                />
              ),
              h2: ({ node, ...props }) => (
                <h2
                  style={{ fontSize: "1.2rem", margin: "0", lineHeight: "1" }}
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
