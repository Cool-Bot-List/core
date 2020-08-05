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
    if (!config.token || !config.client || !(config.client instanceof Client)) throw new Error("Please provide a valid config.");
    if (config.logging === undefined) config.logging = true;
    if (config.interval) {
      if (900000 > config.interval) config.interval = 90000;
    } else if (config.interval === undefined) config.interval = 90000;
  }
  /**
   * Initialize your discord bot.
   * @param data - Information about how to send the data.
   */
  // should we call this send instead?
  public init(data?: InitData): void {
    let sendTotalGuilds: boolean | undefined = data?.sendTotalGuilds;
    let sendTotalUsers: boolean | undefined = data?.sendTotalUsers;
    let sendPresence: boolean | undefined = data?.sendPresence;

    if (data) {
      console.log("This has Data.");
      if (data.sendTotalGuilds === undefined) sendTotalGuilds = true;
      if (data.sendTotalUsers === undefined) sendTotalUsers = true;
      if (data.sendPresence === undefined) sendPresence = true;
    } else {
      sendTotalGuilds = true;
      sendTotalUsers = true;
      sendPresence = true;
    }
    console.log(`guilds: ${sendTotalGuilds}\nusers: ${sendTotalUsers}\npresence: ${sendPresence}`);
    setInterval(async () => {
      const r = await axios.put("http://localhost:5000/api/bots/client", {
        token: this.config.token,
        client: this.config.client,
        sendTotalGuilds,
        sendTotalUsers,
        sendPresence,
      });
      if (r.status === 200 || r.status === 201) {
        if (!this.config.logging) return;
        else return r.data.message;
      }
    }, this.config.interval);
  }
  /**
   * Sends the presence of the bot to the API.
   */
  public sendPresence(): void {
    setInterval(async () => {
      axios.put("http://localhost:5000/api/bots/client", {
        token: this.config.token,
        client: this.config.client,
        sendTotalGuilds: false,
        sendTotalUsers: false,
        sendPresence: true,
      });
    }, this.config.interval);
  }
  /**
   * Sends the total amount of users the bot has.
   */
  public sendTotalUsers() {
    // code later
  }
}

// Example
const client = new Client();
client.login("SECERT");

client.on("ready", () => {
  const botList = new CoolBotList({
    client,
    token: "asjdfjiweofjafasmfnsodfjh",
    interval: 10,
  });
  // // sends EVERYTHING
  // botList.init();
  // // sends everything BUT presence
  // botList.init({ sendPresence: false });
  // // ONLY sends presence
  // botList.sendPresence();

  botList.init();
});
