class BingApi {
  private static instance: BingApi;

  private readonly URI = "https://api.bing.microsoft.com/v7.0/search";
  private readonly COUNT = 1;
  private readonly RESPONSE_FILTER = "Webpages";
  private readonly SAFE_SEARCH = "Strict";

  private apiKey: string;

  private constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  public static getInstance(): BingApi {
    if (!BingApi.instance) {
      this.instance = new BingApi(process.env.NEXT_PUBLIC_BING_API_KEY!);
    }
    return BingApi.instance;
  }

  public async search(query: string): Promise<BingResponse> {
    const response = await fetch(
      `${this.URI}?count=${this.COUNT}&responseFilter=${this.RESPONSE_FILTER}&safeSearch=${this.SAFE_SEARCH}&q=${query}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Ocp-Apim-Subscription-Key": this.apiKey,
        },
      }
    );
    return (await response.json()) as BingResponse;
  }
}

export default BingApi;
