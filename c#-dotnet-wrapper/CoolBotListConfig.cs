using DSharpPlus;

namespace CoolBotList.NET
{
    class CoolBotListConfig
    {
        public string token;
        public DiscordClient client;
        public int interval;
        public string presence;

        CoolBotListConfig(CoolBotListConfig config)
        {
            this.token = config.token;
            this.client = config.client;
            this.interval = config.interval;
            this.presence = config.presence;
        }
    }
}