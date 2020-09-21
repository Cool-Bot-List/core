using System;


namespace CoolBotList.Exceptions
{
    sealed class InvalidIntervalException : Exception
    {

        /// <summary>
        /// The default Exception.
        /// </summary>
        public InvalidIntervalException()
            : base("Invalid interval.") { }


        /// <summary>
        /// The Exception when an interval is passed in.
        /// </summary>
        public InvalidIntervalException(int interval)
            : base($"The interval {interval} is less than 90000.") { }
    }
}