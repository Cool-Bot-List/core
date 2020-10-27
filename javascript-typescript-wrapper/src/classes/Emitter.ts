import { EventEmitter } from "events";
import io from "socket.io-client";
import { CoolBotListConfig } from "../interfaces/CoolBotListConfig";
import { Events } from "../constants/Events";
import { User } from "discord.js";

/**
 * The event emitter used to emit events such as votes to the user/bot.
 */
class CoolBotListEmitter extends EventEmitter implements CoolBotListEmitter {
  private socket = io("https://coolbotlistapi.herokuapp.com");

  /**
   * Initializes the WebSocket to receive and emit events.
   */
  constructor(protected config: CoolBotListConfig) {
    super();

    this.socket.on("new-vote", (user: { id: string }) => {
      this.emit(Events.VOTE, config.client.users.cache.get(user.id), new Date());
    });
  }
}

declare interface CoolBotListEmitter {
  on(event: "vote", listener: (user: User, date: Date) => void): this;
}

export const Emitter = CoolBotListEmitter;