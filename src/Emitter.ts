import { EventEmitter } from "events";
import io from "socket.io-client";
import { Snowflake } from "./interfaces/snowflake";
import Vote from "./interfaces/Vote";
/**
 * The event emitter used to emit events such as votes to the user/bot.
 */
export default class Emitter extends EventEmitter {
  private socket = io("http://localhost:5000");

  constructor() {
    super();
  }

  /**
   * Initializes the WebSocket to receive and emit events.
   */
  public Main(): void {
    this.socket.on("vote", (vote: Vote, userId: Snowflake, botId: Snowflake) => {
      if (vote.bot === botId) {
        this.emit("vote", userId, botId);
      }
    });
  }
}
