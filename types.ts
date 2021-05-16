export type SearchWord = {
  query: string;
  displayQuery: string;
};

export type TopSearch = {
  top_search: {
    words: SearchWord[];
  };
};
