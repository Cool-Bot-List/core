# Rest API Documentation

You can use the Rest API as an alternative option to update your bot. You may want to do this because an API wrapper for your language is not available.

## Endpoint

Make a put request to the endpoint.

```
PUT https://coolbotlistapi.herokuapp.com/update-my-bot
```

## Authorization

To be authenticated, you must add your [Cool Bot List Token](https://coolbotlist.tk/token) to the headers. Your headers should look like this.

```json
{
    "authorization": "Bearer YOUR TOKEN"
}
```

## Body

The body of the request should contain the data the bot should be updated to. Here is an example of the body.

```json
{
    "client": {
        "user": "The ID of the bot to send",
        "guilds": ["An array of guild IDs the bot is in"],
        "users": ["An array of user IDs the bot has."]
    },
    "presence": { "status": "The status to update to on Cool Bot List. This can be online, idle, dnd, invisible, or mobile." },
    "sendTotalGuilds": true,
    "sendTotalUsers": true,
    "sendPresence": true
}
```

# Response

If everything saves then the API will respond with this.

```json
{
    "message": "Successfully updated the bot's stats.",
    "status": 201
}
```
