import { CognitiveServicesCredentials } from "@azure/ms-rest-azure-js";
import { WebSearchClient } from "@azure/cognitiveservices-websearch";

class BingApi {
  private static instance: BingApi;

  private credentials: CognitiveServicesCredentials;
  private webSearchClient: WebSearchClient;
  private readonly PROPERTIES = ["webPages"]; 

  private constructor(apiKey: string) {
    this.credentials = new CognitiveServicesCredentials(apiKey);
    this.webSearchClient = new WebSearchClient(this.credentials);
  }

  public static getInstance(): BingApi {
    if (!BingApi.instance) {
      this.instance = new BingApi(process.env.NEXT_PUBLIC_BING_API_KEY!);
    }
    return BingApi.instance;
  }


  public async search(message:string):Promise<void> {
    const result = await this.webSearchClient.web.search(message);
    console.log(result);
  }
}

export default BingApi;