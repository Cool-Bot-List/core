import { Snowflake } from "./snowflake";

/**
 * Represents a bot vote object.
 */
export default interface Vote {
  /**
   * The id of the bot that was voted for.
   */
  bot: Snowflake;
  /**
   * The date that the vote happened.
   */
  date: Date;
}
