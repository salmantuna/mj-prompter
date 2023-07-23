import downloadFile from "./download.js";
import MidJourneyBot from "./midjourney.js";
import { midjourney, imagePath } from "./config.js";
import generatePrompts from "./bard.js";

const main = async () => {
  // const prompts = await generatePrompts(1);
  const bot = await new MidJourneyBot(midjourney).init();
  
  for (const prompt of prompts) {
    await bot.getImagines(prompt);
  }

  const allImages = await bot.getUpscales();

  for (const { label, uri, msgId } of allImages) {
    await downloadFile(uri, `${imagePath}/${msgId}/${label}.jpg`);
  }
};

main()
  .then(() => {
    console.log("FINISH");
    process.exit();
  })
  .catch((e) => console.error(e));
