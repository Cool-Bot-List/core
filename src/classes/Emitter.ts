import { EventEmitter } from "events";
import io from "socket.io-client";
import { snowflake } from "../interfaces/Snowflake";
import Vote from "../interfaces/Vote";
import CoolBotListConfig from "../interfaces/CoolBotListConfig";
import { Events } from "../constants/Events";

/**
 * The event emitter used to emit events such as votes to the user/bot.
 */
class Emitter extends EventEmitter implements Emitter {
  private socket = io("http://localhost:5000");

  /**
   * Initializes the WebSocket to receive and emit events.
   */
  constructor(protected config: CoolBotListConfig) {
      super();

      this.socket.on("vote", (vote: Vote, userId: snowflake) => {
          const date = new Date(vote.date);
          vote.date = date;

          if (vote.bot === this.config.client.user?.id) {
              this.emit(Events.vote, vote, userId);
          }
      });
  }
}

declare interface Emitter {
  on(event: "vote", listener: (vote: Vote, userId: snowflake) => void): this;
}
export default Emitter;