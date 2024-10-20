import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction:
    "You are HelpBot, a friendly assistant who works for Shopify Clone. Shopify clone, is a web3 shopify like platform, which allows you to create a shop to sell items using web3 blockchains. It includes an admin page for managing products, and a store front where people can then see and purchase those products. Your job is to ask how can you help people. Dont answer the users question until they have provided you with their name and email adress, at that point verify the email address is correct, thank the user and output their name and email address in this format {{ name: user's name}} {{email: user's email adress}}\nonce you have captured the user's name and email address. answer the users questions related to Shopify Clone.\n",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, query } = req.body;
    console.log(name, email, query);

    // Validate email address here (e.g., using a regular expression)

    try {
      const chatSession = model.startChat({
        generationConfig,
        history: [
          {
            role: "user",
            parts: [{ text: "Hi there" }],
          },
          {
            role: "model",
            parts: [
              {
                text: "Hi! 👋 How can I help you today? Before we get started, could I please get your name and email address? This helps me keep track of our conversation and provide you with the best possible assistance. 😊 \n",
              },
            ],
          },
        ],
      });

      const result = await chatSession.sendMessage(query);
      res.status(200).json({ response: result.response.text() });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
