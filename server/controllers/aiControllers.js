const { GoogleGenerativeAI } = require("@google/generative-ai");
const API_KEY = process.env.API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);

exports.ai = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).send({ message: "Prompt is required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Use correct method name & version
    const result = await model.generateContent(prompt);
    const response = await result.response.text();

    res.status(200).send({ result: response }); // Fixed typo: resultL → result
  } catch (error) {
    console.error("Error generating daily challenges:", error);
    res.status(500).send({ message: "Error generating daily challenges" });
  }
};
