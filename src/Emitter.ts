import { EventEmitter } from "events";
import io from "socket.io-client";
import { Snowflake } from "./interfaces/Snowflake";
import Vote from "./interfaces/Vote";
import CoolBotListConfig from "./interfaces/CoolBotListConfig";
import { Events } from "./constants/Events";

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

    this.socket.on("vote", (vote: Vote, userId: Snowflake) => {
      console.log("test");
      console.log(new Date(vote.date).toLocaleString());
      const date = new Date(vote.date);
      vote.date = date;

      if (vote.bot === this.config.client.user?.id) {
        console.log(true, "emitted");
        this.emit(Events.vote, vote, userId);
      }
    });
  }
}

declare interface Emitter {
  on(event: "vote", listener: (vote: Vote, userId: Snowflake) => void): this;
}
export default Emitter;
