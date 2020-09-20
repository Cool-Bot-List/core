package coolbotlist.java;

import coolbotlist.java.constants.Presence;
import coolbotlist.java.interfaces.CoolBotListConfig;
import net.dv8tion.jda.api.JDA;

final class CoolBotList {
    /**
     * The API token.
     */
    private String token = null;

    /**
     * The client used to make your bot.
     */
    private JDA jda = null;

    /**
     *  The interval in ms you want to send data to the API at.
     *  The default is 90000.
     */
    private int interval = 90000;

    /**
     * The presence the bot will appear as in the Cool Bot List website.
     */
    private Presence presence = null;

    CoolBotList(String token, JDA client, int interval, Presence presence) {
        this.token = token;
        this.client = client;
        this.interval = interval;
        this.presence = presence;
    }
}
