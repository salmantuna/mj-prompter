import * as dotenv from "dotenv";
const config = {
  midjourney: {
    ServerId: process.env.MJ_SERVER_ID,
    ChannelId: process.env.MJ_CHANNEL_ID,
    SalaiToken: process.env.MJ_TOKEN,
  },
  imagePath: "images",
  bard: {
    cookieKey: process.env.BARD_TOKEN,
  },
};
export default config;
