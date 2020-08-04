import axios from "axios";
import { Client } from "discord.js";
import InitData from "./interfaces/InitData";
import CoolBotListConfig from "./interfaces/CoolBotListConfig";

export default class CoolBotList {
  /**
   * A way to send the bots data to localhost:3000
   * @param config - Settings for the the CoolBotList
   */
  constructor(private config: CoolBotListConfig) {
    if (!config.token || !config.client || config.client! instanceof Client) throw new Error("Please provide a valid config.");
    if (config.logging === undefined) config.logging = true;
    if (config.interval) {
      if (900000 < config.interval) config.interval = 90000;
    }
  }
  /**
   * Sends the presence of the bot to the API.
   */
  public sendPresence(): void {
    setInterval(async () => {
      axios.put("http://localhost:5000/api/bots/client", {
        client: this.config.client,
        sendTotalGuilds: false,
        sendTotalUsers: false,
        sendPresence: true,
      });
    }, this.config.interval);
  }

  /**
   * Initialize your discord bot.
   * @param data - Information about how to send the data.
   */
  // should we call this send instead?
  public init(data: InitData): void {
    let sendTotalGuilds: boolean | undefined;
    let sendTotalUsers: boolean | undefined;
    let sendPresence: boolean | undefined;

    sendTotalGuilds = data.sendPresence;
    sendTotalUsers = data.sendTotalUsers;
    sendPresence = data.sendPresence;

    if (data.sendTotalGuilds === undefined) sendTotalGuilds = true;
    if (data.sendTotalUsers === undefined) sendTotalUsers = true;
    if (data.sendPresence == undefined) sendPresence = true;

    if (!data) {
      sendTotalGuilds = true;
      sendTotalUsers = true;
      sendPresence = true;
    }

    setInterval(async () => {
      const r = await axios.put("http://localhost:5000/api/bots/client", { token: this.config.token, client: this.config.client, sendTotalGuilds, sendTotalUsers, sendPresence });
      if (r.status === 200 || r.status === 201) {
        if (!this.config.logging) return;
        else return r.data.message;
      }
    }, this.config.interval);
  }
}
