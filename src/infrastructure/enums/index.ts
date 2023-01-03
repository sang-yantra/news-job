import { TupleToObject } from "../../utils/index.js";
export const newsCategories = [
  "MISC",
  "BUSINESS",
  "ENTERTAINMENT",
  "HEALTH",
  "SCIENCE",
  "SPORTS",
  "TECHNOLOGY",
] as const;
type NewsTypes = TupleToObject<typeof newsCategories>;
const NEWS: NewsTypes = newsCategories.reduce((obj: any, val) => {
  obj[val] = val;
  return obj;
}, {});
export default NEWS;
