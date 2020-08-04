import { Client } from "discord.js";

export default interface MainConfig {
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
  interval: number;
  /**
   *  If true it will send return data back to the methods.
   *  If false it will not send return data back.
   *  The default for this true
   */
  logging: boolean;
}
