export default interface InitData {
  /**
   * Whether to send the total amount of guilds the bot is in
   * The default is true.
   */
  sendTotalGuilds?: boolean;
  /**
   * Whether to send the total amount of users the bot has.
   * The default is true.
   */
  sendTotalUsers?: boolean;
  /**
   * Whether to send the current presence of the bot. (online, dnd, away, invisible )
   * The default is true.
   */
  sendPresence?: boolean;
}
