type Mode = "GPT" | "SEARCH";

type BingResponse = {
  _type: string;
  queryContext: {
    originalQuery: string;
  };
  webPages: {
    webSearchUrl: string;
    totalEstimatedMatches: number;
    value: {
      id: string;
      name: string;
      url: string;
      displayUrl: string;
      snippet: string;
      deepLinks: {
        name: string;
        url: string;
        snippet: string;
      }[];
    }[];
  };
  relatedSearches: {
    id: string;
    value: {
      text: string;
      displayText: string;
      webSearchUrl: string;
    }[];
  };
  rankingResponse: {
    mainline: {
      items: {
        answerType: string;
        resultIndex: number;
        value: {
          id: string;
        };
      }[];
    };
    sidebar: {
      items: {
        answerType: string;
        value: {
          id: string;
        };
      }[];
    };
  };
};
