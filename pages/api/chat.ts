import OpenAIApi from "@/libs/openAi";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) => {
  try {
    const message = await OpenAIApi.getInstance("CHAT").sendMessage(
      req.body.name,
      req.body.message
    );
    res.status(200).json({ message });
  } catch (e) {
    res.status(500).json({
      message: "An error occurred during your request.",
    });
  }
};

export default handler;
