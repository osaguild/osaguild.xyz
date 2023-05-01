import {
  Configuration,
  ChatCompletionRequestMessage,
  OpenAIApi as OriginOpenAIApi,
} from "openai";

class OpenAIApi {
  private static instance: OpenAIApi;

  private readonly MODEL = "gpt-3.5-turbo";
  private readonly TEMPERATURE = 0;
  private readonly MAX_TOKENS = 50;
  private readonly SYSTEM_CONTENT =
    "you can start chat if user text 'hello'." +
    "you can't start conversation before user text 'hello' then you only answer 'please say hello'." +
    "if user text 'hello' then you ask user's name" +
    "if user doesn't text name then you ask user's name until user answers." +
    "if user text name then you say 'hello {name}, my name is osaguild. I'm glad to meet you.' and you can start conversation.";

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
        content: this.SYSTEM_CONTENT,
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
    console.log(
      `[openai]registered messages before you send request: ${JSON.stringify(
        this.messages
      )}}`
    );

    // get messages
    const _systemMessage = this.messages.find((e) => e.role === "system")!;
    const _userHistoryMessages = this.messages.filter((e) => e.name === name);
    const _newMessage: ChatCompletionRequestMessage = {
      role: "user",
      content: message,
      name,
    };
    const _messages = [_systemMessage, ..._userHistoryMessages, _newMessage];

    try {
      console.log(`[openai]request messages: ${JSON.stringify(_messages)}`);

      // call api
      const completion = await this.api.createChatCompletion({
        model: this.MODEL,
        messages: _messages,
        temperature: this.TEMPERATURE,
        max_tokens: this.MAX_TOKENS,
      });

      // add user message
      this.messages.push(_newMessage);

      // add assistant message
      this.messages.push({
        role: "assistant",
        content: completion.data.choices[0].message!.content!.trim(),
        name,
      });

      console.log(`[openai]response data: ${JSON.stringify(completion.data)}`);

      console.log(
        `[openai]registered messages after you send request: ${JSON.stringify(
          this.messages
        )}}`
      );

      return completion.data.choices[0].message!.content!.trim();
    } catch (e) {
      console.error(`Error with OpenAI API request: ${e}`);
      throw e;
    }
  }
}

export default OpenAIApi;
