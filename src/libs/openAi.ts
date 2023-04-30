import {
  Configuration,
  ChatCompletionRequestMessage,
  OpenAIApi as OriginOpenAIApi,
} from "openai";

class OpenAIApi {
  private static instance: OpenAIApi;

  private readonly MODEL = "gpt-3.5-turbo";
  private readonly TEMPERATURE = 0;
  private readonly MAX_TOKENS = 10;

  private api: OriginOpenAIApi;
  private messages: ChatCompletionRequestMessage[];

  private constructor(apiKey: string) {
    this.api = new OriginOpenAIApi(
      new Configuration({
        apiKey,
      })
    );

    this.messages = [
      {
        role: "system",
        content: "your name is osaguild.",
      },
    ];
  }

  public static getInstance(): OpenAIApi {
    if (!OpenAIApi.instance) {
      this.instance = new OpenAIApi(process.env.NEXT_PUBLIC_OPENAI_API_KEY!);
    }
    return OpenAIApi.instance;
  }

  public async sendMessage(name: string, message: string): Promise<string> {
    // get messages
    const _systemMessage = this.messages.find((e) => e.role === "system")!;
    const _userMessages = this.messages.filter((e) => e.name === name);
    const _messages = [_systemMessage, ..._userMessages];

    try {
      console.log(`[openai]request messages: ${_messages}`);

      // call api
      const completion = await this.api.createChatCompletion({
        model: this.MODEL,
        messages: _messages,
        temperature: this.TEMPERATURE,
        max_tokens: this.MAX_TOKENS,
      });

      // add message
      this.messages.push({
        role: "user",
        content: message,
        name,
      });

      console.log(`[openai]response data: ${completion.data}`);

      return completion.data.choices[0].message!.content!.trim();
    } catch (e) {
      console.error(`Error with OpenAI API request: ${e}`);
      throw e;
    }
  }
}

export default OpenAIApi;
