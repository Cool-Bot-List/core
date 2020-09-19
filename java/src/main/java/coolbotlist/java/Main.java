package coolbotlist.java;

import net.dv8tion.jda.api.JDA;
import net.dv8tion.jda.api.JDABuilder;
import net.dv8tion.jda.api.entities.Activity;

import javax.security.auth.login.LoginException;

public class Main {

    public static void main(String[] args) throws LoginException {
        JDA client = createClient();
    }

    private static JDA createClient() throws LoginException {
        return JDABuilder
                .createDefault("NzM1MjczMzQ4ODc1MDI2NTcz.Xxd2qw.9K8gLZMIIpOKA1_qEpF35hsbz_g")
                .addEventListeners(new EventHandler())
                .setActivity(Activity.playing("java"))
                .build();
    }
}
