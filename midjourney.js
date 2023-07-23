import { Midjourney } from "midjourney";

class MidJourneyBot {
  client;
  upscaleLabels = ["U1", "U2", "U3", "U4"];
  imagines = [];
  constructor(config) {
    this.client = new Midjourney(config);
  }

  init = async () => {
    await this.client.init();
    return this;
  };

  getImagines = async (prompt) => {
    const imagine = await this.client.Imagine(prompt);

    if (!imagine) {
      throw Error("No Message from Imagine");
    }

    this.imagines.push(imagine);
  };

  getUpscales = async () => {
    const results = [];
    const requests = [];
    for (const imagine of this.imagines) {
      for (const upscaleLabel of this.upscaleLabels) {
        const customID = imagine.options?.find(
          (o) => o.label === upscaleLabel
        )?.custom;

        if (!customID) {
          console.log(`No ${upscaleLabel}`);
          continue;
        }

        requests.push({
          upscaleLabel,
          msgId: imagine.id,
          flags: imagine.flags,
          customId: customID,
        });
      }
    }
    for (const { customId, flags, msgId, upscaleLabel } of requests) {
      const Upscale = await this.client.Custom({ customId, msgId, flags });

      if (!Upscale) {
        console.log(`No Upscale for ${msgId}-${customId}-${upscaleLabel}`);
        continue;
      }

      results.push({
        msgId,
        label: upscaleLabel,
        uri: Upscale.uri,
      });
    }
    return results;
  };
}
export default MidJourneyBot;
