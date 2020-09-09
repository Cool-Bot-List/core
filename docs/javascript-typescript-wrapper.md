# Cool Bot List Wrapper Documentation.


## Installing the NPM package.
Run the folowing command in a termnal or command line.

```
npm i coolbotlist.js 
```

## Setting the Wrapper Up
Once the package has successfully been installed you'll need to create a new instance of the wrapper. You're required to pass the client as the first parameter and your API token as the second.

```js
const CoolBotList = require('coolbotlist.js');
const cbl = new CoolBotList({
   client,
   token: "YOUR COOLBOTLIST TOKEN"
});
```

## Sending Data
After creating a instance of the CoolBotList class. You will want to send the data. You can do that using the init method.

```ts
cbl.init();
```

### JSON Responses
If everything goes well you'll be prompted with a 201 status code and this JSON.

```json
{ 
    message: "Successfully updated the bot's stats." 
}
```

If you're missing parameters you'll be prompted with a 400 status code and this JSON.

```json
{ 
    message: "You are missing properties in the body.", 
    error: 400
}
```

If the bot isn't found in our database we'll return with a 404 error and a JSON looking like this.

```json
{ 
    message: "The bot was not found.", 
    error: 404 
}
```

If you experience a status code of 500 please mention the website administrators. The JSON should look like this.

```json
{ 
    message: "Something went wrong and the bot didn't update", 
    error: 500 
}
```

### Please note this wrapper only works for [Cool Bot List](https://google.com).
