const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const GeminiResponse = async (req, res) => {
  const userQuestion = req.body.search;

  if (!userQuestion) {
    return res.status(400).json({ error: "Please provide a question" });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: userQuestion }] }],
    });

    const text = await result.response.text();

    const response = {
      question: userQuestion,
      answer: text,
    };
    res.status(200).json(response);
  } catch (err) {
    console.log("Error is", err);
    res.status(500).json({ error: "An error occurred while processing your request" });
  }
};

module.exports = { GeminiResponse };
