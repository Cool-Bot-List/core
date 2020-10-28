# GraphQL API Documentation

You can use the GraphQL API as an alternative option to update your bot. You may want to do this because you can get only the data you want back.

## Endpoint

This is the GraphQL endpoint.

```
https://coolbotlistapi.herokuapp.com/graphql
```

## Authorization

To be authenticated, you must add your [Cool Bot List Token](https://coolbotlist.tk/token) to the headers. Your headers should look like this.

```json
{
    "authorization": "Bearer YOUR TOKEN"
}
```

## Request

The GraphQl request should contain the data the bot should be updated to. Here is an example of the request.

```gql
mutation {
    updateMyBot(
        botUpdatable: {
            client: {
                user: "The ID of the bot to send"
                guilds: ["An array of guild IDs the bot is in"]
                users: ["An array of user IDs the bot has."]
            }
            presence: { status: "The status to update to on Cool Bot List. This can be online, idle, dnd, invisible, or mobile." }
            sendTotalGuilds: true
            sendTotalUsers: true
            sendPresence: true
        }
    ) {
        message
        status
    }
}
```

# Response

If everything saves then the API will respond with this.

```json
{
    "data": {
        "updateMyBot": {
            "message": "Successfully updated the bot's stats.",
            "status": 201
        }
    }
}
```
