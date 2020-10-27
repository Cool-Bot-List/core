import { Client } from "discord.js";
import { PresenceResolvable } from "./PresenceResolvable";

export interface CoolBotListConfig {
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
     * The default is 60000.
     */
    interval?: number;
    /**
     * The presence the bot will appear as in the Cool Bot List website.
     */
    presence?: PresenceResolvable;
}
