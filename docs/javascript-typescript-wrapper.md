# JavaScript/TypeScript Wrapper Documentation
This wrapper is a easy way of sending your bots data to [Cool Bot List](https://coolbotlist.tk) without having to setup the Rest or GraphQL API.


## Installing the NPM package.

Run the folowing command in a termnal or command line.

```
npm i coolbotlist.js
```

## Setting the Wrapper Up

You will need to create a new instance of the wrapper. You must to pass an object with the Discord.js client and your [API token](https://coolbotlist.tk/token) that you get from our website.

You can also pass in presence. This is what the bot will appear as on Cool Bot List. Valid presences are online, dnd, away, invisible, mobile. The default is online if you don't pass one.

Remember to create the CoolBotList instance in the ready event of your Discord.js Client.

```ts
const { CoolBotList } = require("coolbotlist.js");
const { Client } = require ("discord.js");

const client = new Client();
client.login("DISCORD BOT TOKEN");

client.on("ready, () => {
  const cbl = new CoolBotList({
      client,
      presence: "dnd",
      token: "YOUR COOLBOTLIST TOKEN",
 });
```

If you are using TypeScript or ES6 modules use import instead of require.

```ts
import { CoolBotList } from "coolbotlist.js";
import { Client } from "discord.js";
```

## Sending Data

After creating a instance of the CoolBotList class you need to send the data. You can do that using the send method.

```ts
cbl.send();
```
If you only want to send certain parts of the bot then pass in an object with the data.

```ts
cbl.send({ sendGuilds: false });
```

## Handling Vote Events

When your bot is voted an event is emitted. You can listen to that event by attaching a callback function.

```ts
cbl.on("vote", (user, date) => {
  user.send(`Thanks for voting at ${date.toLocalString()}`);
}
```

You can do things such as giving a user or price or sending them a thank you message.
