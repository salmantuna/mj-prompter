import downloadFile from "./download.js";
import MidJourneyBot from "./midjourney.js";
import config from "./config.js";
import generatePrompts from "./bard.js";

const main = async () => {
  const prompts = await generatePrompts(1);
  const bot = await new MidJourneyBot(config.midjourney).init();
  
  for (const prompt of prompts) {
    await bot.getImagines(prompt);
  }

  const allImages = await bot.getUpscales();

  for (const { label, uri, msgId } of allImages) {
    await downloadFile(uri, `${config.imagePath}/${msgId}/${label}.jpg`);
  }
};

main()
  .then(() => {
    console.log("FINISH");
    process.exit();
  })
  .catch((e) => console.error(e));
