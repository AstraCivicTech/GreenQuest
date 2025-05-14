// import { useState } from "react";
// import { validateChallenge } from "../adapters/ai-adapters";

// // This component is for user created challenges
// export const CreateChallengeForm = () => {
//   const [prompt, setPrompt] = useState("");
//   const [result, setResult] = useState("");

//   const handleClick = async () => {
//     const [data, error] = await validateChallenge(prompt);

//     if (error) {
//       alert("Failed to fetch AI result." + error.message);
//       return;
//     }

//     console.log("AI response:", data);

//     setResult(data.result);
//   };

//   return (
//     <div>
//       <h2>Ask AI</h2>
//       <textarea
//         rows="4"
//         value={prompt}
//         onChange={(e) => setPrompt(e.target.value)}
//         placeholder="Enter your prompt..."
//       />
//       <button onClick={handleClick}>Submit Prompt</button>

//       {result && (
//         <div>
//           <h3>AI Response:</h3>
//           <p>{result}</p>
//         </div>
//       )}
//     </div>
//   );
// };
