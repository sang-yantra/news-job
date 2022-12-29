type NewsResponse = {
  status: string;
  totalResults: Number;
  articles: Articles[];
};

export type Articles = {
  author: string | null;
  title: string;
  description: string | null;
  url: string | null;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
};

export default NewsResponse;
