# Cool Bot List Wrapper Documentation.
<br>
## Installing the NPM package.
```
npm i coolbotlist.js --save
```


<br>
Once the package has successfully been installed you'll need to create a new instance of the wrapper. You're required to pass the client as the first parameter and your API token as the second.
<br>
``` js
const CoolBotList = require('coolbotlist.js');
const CBL = new CoolBotList({
   client,
   token: "YOUR COOLBOTLIST TOKEN"
});
```
<br>
If everything goes well you'll be prompted with a 201 status code and this JSON.
<br>
``` json
{ 
    message: "Successfully updated the bot's stats." 
}
```
<br>
If you're missing parameters you'll be prompted with a 400 status code and this JSON.
<br>
```json
{ 
    message: "You are missing properties in the body.", 
    error: "Bad Request." 
}
```
<br>
If the bot isn't found in our database we'll return with a 404 error and a JSON looking like this.
<br>
```json
{ 
    message: "The bot was not found.", 
    error: "Not Found."
}
```
<br>
If you experience a status code of 500 please mention the website administrators. The JSON should look like this.
<br>
```json
{ 
    message: "Something went wrong and the bot didn't update", 
    error: "Internal Server Error." 
}
```

### Please note this wrapper only works for [Cool Bot List](https://google.com).