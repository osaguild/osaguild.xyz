import BingApi from "@/libs/bing";
import "dotenv/config";

describe("bing", () => {

  it("search", async () => {
    const bing = BingApi.getInstance();
    await bing.search("hello");
  });
});
