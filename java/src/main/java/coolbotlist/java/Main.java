package coolbotlist.java;

import coolbotlist.java.constants.Presence;
import net.dv8tion.jda.api.EmbedBuilder;
import net.dv8tion.jda.api.JDA;
import net.dv8tion.jda.api.JDABuilder;
import net.dv8tion.jda.api.entities.Activity;
import net.dv8tion.jda.api.entities.Message;
import net.dv8tion.jda.api.events.message.MessageReceivedEvent;
import javax.security.auth.login.LoginException;
import java.awt.*;

public class Main {

    public static String prefix = "c!";

    public static void main(String[] args) throws Exception {
        JDA client = createClient();
       CoolBotList cbl = new CoolBotListBuilder()
               .setToken("safd")
               .setInterval(90)
               .setPresence(Presence.mobile)
               .build();
    }

    private static JDA createClient() throws LoginException {
        return JDABuilder
                .createDefault("")
                .addEventListeners(new EventHandler())
                .setActivity(Activity.playing("java"))
                .build();
    }

    public static void sendEmbed(MessageReceivedEvent event) {
        Message message = event.getMessage();
        if (message.getContentRaw().equalsIgnoreCase(Main.prefix + "embed")) {
            EmbedBuilder embed = new EmbedBuilder()
                    .setAuthor(message.getAuthor().getName(), message.getAuthor().getAvatarUrl())
                    .addField("key", "value", false)
                    .setColor(Color.decode("#33ECFF"))
                    .setDescription("This is the description.");
            message.getChannel().sendMessage(embed.build()).queue();
        }
    }
}
