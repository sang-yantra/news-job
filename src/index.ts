import NewsImport from "./infrastructure/news-import.js";
import logger from "./logging/index.js";
import cron from "node-cron";
async function main() {
  try {
    logger.info("app started...");
    const newsImport = new NewsImport();
    await newsImport.start();
    logger.info("app completed...");
  } catch (error) {
    console.log(error);
  }
}
cron.schedule("*/5 * * * *", function () {
  main();
});
