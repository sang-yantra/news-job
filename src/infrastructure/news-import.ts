import fetch from "node-fetch";
import ACTIONS, { COUNTRY } from "../services/action.js";
import { API_KEY } from "../constants/index.js";
import NewsResponse, { Articles } from "../services/model/response.js";

import { PrismaClient } from "@prisma/client";
import News from "./news/CreateNews.js";
import logger from "../logging/index.js";
import NEWS, { newsCategories } from "./enums/index.js";
const prisma = new PrismaClient();
export default class NewsImport {
  news: NewsResponse | undefined;

  /**
   * Method to start processing
   */
  async start() {
    for (let category of newsCategories) {
      logger.info(`Process for category - ${category} started`);
      await this.getNewsByCategory(category);
      const createNews = new News();
      await createNews.saveNewsFromResposeAsyc(this.news?.articles, category);
      logger.info(`Process for category - ${category} completed`);
    }
  }

  async getNewsByCategory(category: string) {
    if (!API_KEY) {
      throw Error("Wrong API key");
    }
    logger.info("Fetching trending news started...");
    let apiParams: any = {
      country: COUNTRY,
      apiKey: API_KEY,
    };
    if (category !== NEWS.MISC) {
      apiParams = { ...apiParams, category: category };
    }
    const fetchTrendingNews = await fetch(
      ACTIONS.TOP_HEADLINES + "?" + new URLSearchParams(apiParams)
    );
    const trendingNews = (await fetchTrendingNews.json()) as NewsResponse;
    if (trendingNews.status === "ok") {
      this.news = trendingNews;
    }
    logger.info("Fetching trending news completed...");
  }
}
