import BingApi from "@/libs/bing";
import OpenAIApi from "@/libs/openAi";
import type { NextApiRequest, NextApiResponse } from "next";
import cheerio from "cheerio";
import _ from "lodash";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{ url: string; summary: string } | { message: string }>
) => {
  try {
    // search web site using bing
    const bingRes = await BingApi.getInstance().search(req.body.query);
    const url = bingRes.webPages.value[0].url;
    const fetchRes = await fetch(url);

    // convert html text
    const html = await fetchRes.text();
    const $ = cheerio.load(html);
    $("script").remove();
    $("style").remove();
    $("noscript").remove();
    $("iframe").remove();
    $("meta").remove();
    const body = $("body").text().replace(/\s+/g, " ").trim();
    const escapedBody = _.escape(body);

    // summarize text using openai
    const summary = await OpenAIApi.getInstance("SUMMARY").sendMessage(
      "hoge",
      escapedBody
    );

    res.status(200).json({ url, summary });
  } catch (e) {
    res.status(500).json({
      message: "An error occurred during your request.",
    });
  }
};

export default handler;
