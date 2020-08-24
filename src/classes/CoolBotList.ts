import axios from "axios";
import { Client } from "discord.js";
import InitData from "../interfaces/InitData";
import CoolBotListConfig from "../interfaces/CoolBotListConfig";
import Emitter from "./Emitter";

export default class CoolBotList extends Emitter {
    /**
   * A way to send the bots data to localhost:3000
   * @param config - Settings for the the CoolBotList
   */
    constructor(protected config: CoolBotListConfig) {
        super(config);
        if (!config.token || !config.client || !(config.client instanceof Client)) throw new Error("Please provide a valid config.");
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
            if (data.sendTotalGuilds === undefined) sendTotalGuilds = true;
            if (data.sendTotalUsers === undefined) sendTotalUsers = true;
            if (data.sendPresence === undefined) sendPresence = true;
        } else {
            sendTotalGuilds = true;
            sendTotalUsers = true;
            sendPresence = true;
        }

        setInterval(async () => {
            try {
                await axios.put(
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
                    }
                );
            } catch (err) {
                throw new Error(err);
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
                }
            );
        }, this.config.interval);
    }

    /**
   * Sends the total amount of guilds that the bot is in.
   */
    public sendTotalGuilds(): void {
        setInterval(async () => {
            axios.put(
                "http://localhost:5000/api/bots/client",
                {
                    client: this.config.client,
                    presence: this.config.client.user!.presence,
                    sendTotalGuilds: true,
                    sendTotalUsers: false,
                    sendPresence: false,
                },
                {
                    headers: {
                        Authorization: `Bearer ${this.config.token}`,
                    },
                }
            );
        }, this.config.interval);
    }
}

// Example
const client = new Client();
client.login("");

client.on("ready", () => {
    console.log("asfd");
    const botList = new CoolBotList({
        client,
        token: "coolbotlist",
    });

    // // sends EVERYTHING
    // botList.init();
    // // sends everything BUT presence
    // botList.init({ sendPresence: false });
    // // ONLY sends presence
    // botList.sendPresence();
    botList.on("vote", (vote, userId) => {
        console.log(`A user voted: ${userId}`);
        console.log(`Vote: ${JSON.stringify(vote)}`);
        console.log(vote);
    });
});