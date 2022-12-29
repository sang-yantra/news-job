import NewsImport from "./infrastructure/news-import.js";
import logger from "./logging/index.js";

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

main();
