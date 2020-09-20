package coolbotlist.java;

import net.dv8tion.jda.api.events.guild.GuildJoinEvent;
import net.dv8tion.jda.api.events.guild.GuildLeaveEvent;
import net.dv8tion.jda.api.events.guild.member.GuildMemberJoinEvent;
import net.dv8tion.jda.api.events.guild.member.GuildMemberRemoveEvent;
import net.dv8tion.jda.api.hooks.ListenerAdapter;
import org.jetbrains.annotations.NotNull;

final class CoolBotListEventListener extends ListenerAdapter {

    @Override
    public void onGuildJoin(@NotNull GuildJoinEvent event) {
        System.out.printf("%s event triggered.\n %s", event.toString(), event.getGuild().getName());
        event.getJDA().getTextChannelById("735252365187481695").sendMessageFormat("%s event triggered.\n %s", event.toString(), event.getGuild().getName()).queue();
    }

    @Override
    public void onGuildLeave(@NotNull GuildLeaveEvent event) {
        System.out.printf("%s event triggered.\n %s", event.toString(), event.getGuild().getName());
        event.getJDA().getTextChannelById("735252365187481695").sendMessageFormat("%s event triggered.\n %s", event.toString(), event.getGuild().getName()).queue();
    }

    @Override
    public void onGuildMemberJoin(@NotNull GuildMemberJoinEvent event) {
        System.out.printf("%s event triggered \n %s has joined %s", event.toString(), event.getMember().getUser().getName(), event.getGuild().getName());
        event.getJDA().getTextChannelById("735252365187481695").sendMessageFormat("%s event triggered \n %s has joined %s", event.toString(), event.getMember().getUser().getName(), event.getGuild().getName()).queue();
    }

    @Override
    public void onGuildMemberRemove(@NotNull GuildMemberRemoveEvent event) {
        System.out.printf("%s event triggered \n %s has left %s", event.toString(), event.getMember().getUser().getName(), event.getGuild().getName());
        event.getJDA().getTextChannelById("735252365187481695").sendMessageFormat("%s event triggered \n %s has left %s", event.toString(), event.getMember().getUser().getName(), event.getGuild().getName()).queue();
    }
}
