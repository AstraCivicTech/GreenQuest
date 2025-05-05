import { useState } from "react";
import { getAiOptions, fetchHandler } from "../utils/fetchingUtils";

export const AIPromptForm = () => {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");

  const handleClick = async () => {
    const [data, error] = await fetchHandler("/api/ai", getAiOptions(prompt));

    if (error) {
      alert("Failed to fetch AI result.");
      return;
    }

    setResult(data.result);
  };

  return (
    <div>
      <h2>Ask AI</h2>
      <textarea
        rows="4"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt..."
      />
      <button onClick={handleClick}>Submit Prompt</button>

      {result && (
        <div>
          <h3>AI Response:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};
