import { PrismaClient, NEWS } from "@prisma/client";
import { Articles } from "../../services/model/response.js";
import { v4 as uuid } from "uuid";
import logger from "../../logging/index.js";
const prisma = new PrismaClient();

export default class News {
  async getAllNewsAsync() {
    return await prisma.nEWS.findMany();
  }

  /**
   * Method to save news from response
   * @param newsResponse
   * @returns
   */
  async saveNewsFromResposeAsyc(
    newsResponse: Articles[] | undefined,
    category: string
  ) {
    logger.info(`Saving ${category} news started...`);
    if (!newsResponse) {
      logger.warn("No news to save...");
      return;
    }
    const gwtAllNews = await prisma.nEWS.findMany({
      where: {
        category: category,
      },
    });
    const newNewsArr = newsResponse
      .filter(
        (news) =>
          !gwtAllNews.some(
            (existingNews) =>
              existingNews.title === news.title &&
              existingNews.author === news.author
          )
      )
      .map((news) => {
        const dateNow = new Date();
        const newNews: NEWS = {
          id: uuid(),
          title: news.title,
          author: news.author,
          description: news.description,
          url: news.url,
          img_url: news.urlToImage,
          content: news.content,
          category: category,
          published_at: dateNow,
          updated_at: dateNow,
        };
        return newNews;
      });
    if (newNewsArr.length === 0) {
      logger.warn("No news to save...");
      return;
    }
    const saveNews = await prisma.nEWS.createMany({
      data: [...newNewsArr],
    });
    logger.info(`total news saved ${saveNews.count}`);
    logger.info(`Saving ${category} news started...`);
  }

  async saveManyNewsASync() {}
}
