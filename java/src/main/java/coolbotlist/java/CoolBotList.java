package coolbotlist.java;

import coolbotlist.java.constants.Presence;
import net.dv8tion.jda.api.JDA;

final class CoolBotList {
    /**
     * The API token.
     */
    private String token;

    /**
     * The jda used to make your bot.
     */
    private JDA jda;

    /**
     *  The interval in ms you want to send data to the API at.
     *  The default is 90000.
     */
    private int interval = 90000;

    /**
     * The presence the bot will appear as in the Cool Bot List website.
     */
    private Presence presence;

    CoolBotList(String token, JDA jda, int interval, Presence presence) {
        this.token = token;
        this.jda = jda;
        this.interval = interval;
        this.presence = presence;

        try {
            jda.awaitReady();
            jda.addEventListener(new CoolBotListEventListener());
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

}
