import BingApi from "@/libs/bing";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) => {
  try {
    const bingResponse = await BingApi.getInstance().search(req.body.query);
    res.status(200).json({ message: JSON.stringify(bingResponse) });
  } catch (e) {
    res.status(500).json({
      message: "An error occurred during your request.",
    });
  }
};

export default handler;
