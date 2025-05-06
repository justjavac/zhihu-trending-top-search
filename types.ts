export type SearchWord = {
  query_display: string;
  real_query: string;
};

export type TopSearch = {
  recommend_queries: {
    queries: SearchWord[];
  };
};
