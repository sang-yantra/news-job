import fetch from "node-fetch";
import ACTIONS, { COUNTRY } from "../services/action.js";
import { API_KEY } from "../constants/index.js";
import NewsResponse, { Articles } from "../services/model/response.js";

import { PrismaClient } from "@prisma/client";
import News from "./news/CreateNews.js";
const prisma = new PrismaClient();
export default class NewsImport {
  news: NewsResponse | undefined;

  async start() {
    await this.getTrendingNews();
    const createNews = new News();
    await createNews.saveNewsFromResposeAsyc(this.news?.articles);
  }

  async getTrendingNews() {
    if (!API_KEY) {
      throw Error("Wrong API keyh");
    }
    const fetchTrendingNews = await fetch(
      ACTIONS.TOP_HEADLINES +
        "?" +
        new URLSearchParams({
          country: COUNTRY,
          apiKey: API_KEY,
        })
    );
    const trendingNews = (await fetchTrendingNews.json()) as NewsResponse;
    if (trendingNews.status === "ok") {
      this.news = trendingNews;
    }
  }
}
