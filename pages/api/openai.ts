import { Configuration, OpenAIApi } from "openai";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  if (!configuration.apiKey) {
    res.status(500).json({
      message: "OpenAI API key not configured",
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: req.body.message,
      temperature: 0,
      max_tokens: 5,
    });
    res.status(200).json({ message: completion.data.choices[0].text!.trim() });
  } catch (e) {
    console.error(`Error with OpenAI API request: ${e}`);
    res.status(500).json({
      message: "An error occurred during your request.",
    });
  }
}
