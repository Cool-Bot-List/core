using System;
using DSharpPlus;

namespace CoolBotList
{
    public class CoolBotList
    {

        public string Token { private get; set; }
        public DiscordClient Client { private get; set; }
        public int Interval { private get; set; }
        public string Presence { private get; set; }


        public CoolBotList()
        {
            Console.WriteLine("constructed");
        }
    }
}