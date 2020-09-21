using System;
using System.Threading.Tasks;
using DSharpPlus;

namespace CoolBotList.NET
{
    class Program
    {
        public static DiscordClient client;
        public static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
            MainAsync(args).ConfigureAwait(false).GetAwaiter().GetResult();
        }

        public static async Task MainAsync(string[] args)
        {
            client = new DiscordClient(new DiscordConfiguration
            {
                Token = "",
                TokenType = TokenType.Bot
            });
            client.MessageCreated += async e =>
            {
                DSharpPlus.Entities.DiscordMessage message = e.Message;
                if (message.Content.ToLower().StartsWith("test"))
                {
                    await message.RespondAsync("sadf");
                }
            };
            Console.WriteLine(client);
            await client.ConnectAsync();
            await Task.Delay(-1);
        }
    }
}
