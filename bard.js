import Bard, { askAI } from "bard-ai";
import { bard } from "./config.js";

const generatePrompts = async (count) => {
  await Bard.init(bard.cookieKey);
  const res = await askAI(
    `[A high-end fashion photography shoot of a [blonde female] model wearing a [Ralph Lauren style] dress. The shoot takes place in a [yacht club]. The model is posing on the deck of the yacht, on the beach, and in the water. The photos are stylish and elegant.] mekan, model, tarz, poz, ellerin duruşu gibi elementleri değiştirerek benzeri ${count} adet midjourney promptu ver. Her Promptun başında % işareti olsun ve sadece promptları bas.`,
    true
  );

  const prompts = [];

  const contentArray = res.content.split("\n");

  for (const prompt of contentArray) {
    if (prompt.startsWith("%")) {
      prompts.push(prompt.replace("%", ""));
    }
  }
  return prompts;
};
export default generatePrompts;
