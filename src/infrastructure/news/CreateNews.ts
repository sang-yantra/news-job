import { PrismaClient, HEADLINE } from "@prisma/client";
import { Articles } from "../../services/model/response.js";
import { v4 as uuid } from "uuid";
const prisma = new PrismaClient();

export default class News {
  async getAllNewsAsync() {
    return await prisma.hEADLINE.findMany();
  }

  async saveNewsFromResposeAsyc(newsResponse: Articles[] | undefined) {
    if (!newsResponse) return;
    const getAllHeadline = await prisma.hEADLINE.findMany();
    const newNewsArr = newsResponse
      .filter(
        (news) =>
          !getAllHeadline.some(
            (existingNews) =>
              existingNews.title === news.title &&
              existingNews.author === news.author
          )
      )
      .map((news) => {
        const newNews: HEADLINE = {
          id: uuid(),
          title: news.title,
          author: news.author,
          description: news.description,
          url: news.url,
          img_url: news.urlToImage,
          content: news.content,
          published_at: new Date(),
          updated_at: new Date(),
        };
        return newNews;
      });
    if (newNewsArr.length === 0) {
      console.log("no headline to save");
      return;
    }
    const saveHeadline = await prisma.hEADLINE.createMany({
      data: [...newNewsArr],
    });
    console.log("total headline saved", saveHeadline.count);
  }

  async saveManyNewsASync() {}
}
