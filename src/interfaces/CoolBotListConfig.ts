import { Client } from "discord.js";

export default interface CoolBotListConfig {
  /**
   *  The API token.
   */
  token: string;
  /**
   *  The discord client used to make your bot.
   */
  client: Client;
  /**
   *  The interval in ms you want to send data to the API at.
   * The default is 90000.
   */
  interval?: number;
}
