using System;

namespace CoolBotList.NET
{
    class CoolBotList
    {
        CoolBotList(CoolBotListConfig config)
        {
            Console.WriteLine($"{this.ToString()} has been constructed.");
            Console.WriteLine(config);

        }
    }
}