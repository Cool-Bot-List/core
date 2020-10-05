# GraphQL API Documentation
You can use the GraphQL API as an alternative option to update your bot. You may want to do this because you can get only the data you want back.

## Endpoint
The GraphQL endpoint is this.

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
        users: ["An array of users the bot has."]
      }
      presence: {
        status: "The status to update to on Cool Bot List. This can be online, idle, dnd, invisible, or mobile."
      }
      sendTotalGuilds: true
      sendTotalUsers: true
      sendPresence: true
    }
  )
}
```

# Response 
The API will respond with this if you were rate limited.

```json
{
    "statusCode": 408,
    "message": "You have been rate limited. You can't call the api for another 46.598 seconds"
}
```
If you don't have a token this will be the response.
```json
{
  "errors": [
    {
      "message": "Please provide a token.",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "updateMyBot"
      ],
      "extensions": {
        "code": "INTERNAL_SERVER_ERROR",
        "exception": {
          "response": "Please provide a token.",
          "status": 400,
          "message": "Please provide a token."
        }
      }
    }
  ],
  "data": null
}
```

If you are missing properties in the body the response will look like this.

```json
{
    "status": 400,
    "message": "You are missing properties."
}
```

If everything saves then this will be the response.

```
Successfully updated the bot's stats.
```
