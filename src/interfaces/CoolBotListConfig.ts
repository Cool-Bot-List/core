import { Client } from "discord.js";

export default interface MainConfig {
  token: string;
  client: Client;
  interval?: number;
  logging?: boolean;
}
