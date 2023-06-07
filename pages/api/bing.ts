import BingApi from "@/libs/bing";
import type { NextApiRequest, NextApiResponse } from "next";
import cheerio from "cheerio";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) => {
  try {
    const bingRes = await BingApi.getInstance().search(req.body.query);
    const fetchRes = await fetch(bingRes.webPages.value[0].url);
    const html = await fetchRes.text();
    const $ = cheerio.load(html);
    const body = $("body").html()!;

    res.status(200).json({ message: body });
  } catch (e) {
    res.status(500).json({
      message: "An error occurred during your request.",
    });
  }
};

export default handler;
