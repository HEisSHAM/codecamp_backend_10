import cheerio from "cheerio";
import axios from "axios";

export const getOG = async (prefer) => {
  const result = await axios.get(prefer);
  let arr = [];
  let obj;

  const $ = cheerio.load(result.data);
  $("meta").each((i, el) => {
    if ($(el).attr("property") && $(el).attr("property").includes("og:")) {
      const value = $(el).attr("content");
      arr.push(value);
      obj = Object.assign({}, arr);
    }
  });
  return obj;
};
