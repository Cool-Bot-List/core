import { Client } from "discord.js";
/**
 * Options of the CoolBotList class
 *@typedef {object} CoolBotListConfig
 *@property {string} token - The api token.
 */
export default interface MainConfig {
    token: string;
    client: Client;
    interval: number;
    logging: boolean;
}
