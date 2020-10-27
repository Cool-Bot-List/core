import axios from "axios";
import { Client } from "discord.js";
import { SendData } from "../interfaces/SendData";
import { CoolBotListConfig } from "../interfaces/CoolBotListConfig";
import { Emitter } from "./Emitter";
import { Presence } from "../constants/Presence";

export class CoolBotList extends Emitter {
    private BASE_URL = "https://coolbotlistapi.herokuapp.com";

    /**
     * A way to send the bots data to https://coolbotlist.tk
     * @param config - Settings for the the CoolBotList
     */
    constructor(protected config: CoolBotListConfig) {
        super(config);
        console.log("constructed")
        if (!config.token && !config.client && !(config.client instanceof Client)) throw new Error("Please provide a valid config.");
        if (config.interval) {
            if (60000 > config.interval) config.interval = 60000;
        } else if (config.interval === undefined) config.interval = 60000;
        if (!config.presence) config.presence = Presence.MOBILE;
        this.handleEvents();
    }

    private handleEvents(): void {
        this.config.client.on("guildCreate", guild => {
            this.send({ sendTotalGuilds: true, sendTotalUsers: false, sendPresence: false }, [guild.id])
        });
        this.config.client.on("guildMemberAdd", user => {
            this.send({ sendTotalGuilds: false, sendTotalUsers: true, sendPresence: false }, [user.id])
        });
        this.config.client.on("guildMemberRemove", user => {
            this.send({ sendTotalGuilds: false, sendTotalUsers: true, sendPresence: false }, [user.id])
        })
    }

    /**
   * Send data from your discord bot.
   * @param data - Information about how to send the data.
   */
    public send(data?: SendData, dataToSend?: any): void {
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
                const r = await axios.put(
                    `${this.BASE_URL}/update-my-bot`,
                    {
                        client: dataToSend ? dataToSend : this.config.client,
                        presence: {
                            status: this.config.presence
                        },
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
                console.log(r.data);
            }
            catch (err) {
                console.log("There was an error:", err.response?.data ? err.response?.data : "server is offline")
            }
        }, 7000);
    }
}

// // Example
// const client = new Client();
// client.login(process.env.BOT_TOKEN);

// client.on("ready", () => {
//     console.log("logged in");
//     const botList = new CoolBotList({
//         client,
//         token: "coolbotlist",
//         presence: "dnd"
//     });

//     // // sends EVERYTHING
//     // botList.send();
//     // // sends everything BUT presence
//     // botList.send({ sendPresence: false });
//     // // ONLY sends presence
//     // botList.sendPresence();
//     botList.on("vote", (vote, userId) => {
//         console.log(`A user voted: ${userId}`);
//         console.log(`Vote: ${JSON.stringify(vote)}`);
//         console.log(vote);
//     });
//     client.user.setPresence({
//         status: "invisible",
//     })
// });


