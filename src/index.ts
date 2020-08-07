import axios from "axios";
import { Client } from "discord.js";
import InitData from "./interfaces/InitData";
import CoolBotListConfig from "./interfaces/CoolBotListConfig";
import ApiData from "./interfaces/ApiData";

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
  public init(data?: InitData): void | ApiData {
    let sendTotalGuilds: boolean | undefined = data?.sendTotalGuilds;
    let sendTotalUsers: boolean | undefined = data?.sendTotalUsers;
    let sendPresence: boolean | undefined = data?.sendPresence;

    if (data) {
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
      const r = await axios.put(
        "http://localhost:5000/api/bots/client",
        {
          client: this.config.client,
          presence: this.config.client.user!.presence,
          sendTotalGuilds,
          sendTotalUsers,
          sendPresence,
        },
        {
          headers: {
            Authorization: `Bearer ${this.config.token}`,
          },
        },
      );
      if (r.status === 200 || r.status === 201) {
        if (this.config.logging === true) return;
        else if (this.config.logging === false) {
          console.log(r.data);
          return r.data;
        }
      }
    }, this.config.interval);
  }
  /**
   * Sends the current presence of the bot to the API. (online, dnd, away, invisible, ect. )
   */
  public sendPresence(): void {
    setInterval(async () => {
      axios.put(
        "http://localhost:5000/api/bots/client",
        {
          client: this.config.client,
          presence: this.config.client.user!.presence,
          sendTotalGuilds: false,
          sendTotalUsers: false,
          sendPresence: true,
        },
        {
          headers: {
            Authorization: `Bearer ${this.config.token}`,
          },
        },
      );
    }, this.config.interval);
  }
}

// Example
const client = new Client();
client.login("");

client.on("ready", () => {
  const botList = new CoolBotList({
    client,
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNDgxMTU4NjMyMDA4OTc0MzM3In0sImlhdCI6MTU5NjgyNjU4Mn0.71mY03QCkHvmZWgb3_1ahUv0xTf8td_pLdgDOj2ZVRo",
  });
  // // sends EVERYTHING
  // botList.init();
  // // sends everything BUT presence
  // botList.init({ sendPresence: false });
  // // ONLY sends presence
  // botList.sendPresence();

  const test = botList.init();

  console.log(test);
});
