export type SearchWord = {
  query: string;
  display_query: string;
};

export type TopSearch = {
  top_search: {
    words: SearchWord[];
  };
};
