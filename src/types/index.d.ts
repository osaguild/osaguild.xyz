type Mode = "CHAT" | "SUMMARY";

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
      isFamilyFriendly: boolean;
      displayUrl: string;
      snippet: string;
      dateLastCrawled: string;
      language: string;
      isNavigational: boolean;
    }[];
    someResultsRemoved: boolean;
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
