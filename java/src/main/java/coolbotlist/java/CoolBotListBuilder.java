package coolbotlist.java;

import coolbotlist.java.constants.Presence;
import net.dv8tion.jda.api.JDA;

public final class CoolBotListBuilder {
    /**
     * The API token.
     */
    private String token;

    /**
     * The client used to make your bot.
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



    /**
     * Sets the token of the CoolBotList to build to the token passed in.
     * @param token The token to set tio.
     */
    public CoolBotListBuilder setToken(String token) {
        this.token = token;
        return this;
    }

    /**
     * Sets the jda of the CoolBotList to build to the jda passed in.
     * @param jda The jda to set to.
     * @return
     */
    public CoolBotListBuilder setJda(JDA jda) {
        this.jda = jda;
        return this;
    }

    /**
     * Sets the interval of the CoolBotList to build to the interval passed in.
     * @param interval The interval to set to.
     * @throws Exception If the interval is less than 90000 ms this exception will be thrown.
     */
    public CoolBotListBuilder setInterval(int interval) throws Exception {
        if ( 90000 > interval )
            throw new Exception("You can't have an interval less than 90000 milliseconds.");

        this.interval = interval;
        return this;
    }

    /**
     * Sets the presence of the CoolBotList to build to the presence passed in.
     * @param presence The presence to set to.
     */
    public CoolBotListBuilder setPresence(Presence presence) {
        this.presence = presence;
        return this;
    }

    public CoolBotList build() {
        return new CoolBotList(token, jda, interval, presence);
    }
}
