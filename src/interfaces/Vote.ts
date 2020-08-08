import { Snowflake } from "./Snowflake";

/**
 * Represents a bot vote object.
 */
export default interface Vote {
  /**
   * The id of the bot that was voted for.
   */
  bot: Snowflake;
  /**
   * The time that the vote happened.
   */
  date: string | Date;
}
