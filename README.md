# Chat App

## Installation

### Local
You must have installed `yarn` in your machine: https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable

It is recommended that you use node version 20.

Install dependencies using yarn:

```bash
yarn install
```

Run the application:
```bash
yarn start
```

### Docker

If you have docker installed, you can run the application using docker:

```bash
docker compose up -d
```

**Note**: make sure the `node_modules` and `dist` folder is not 
in the project directory. Remove if you have them.

## Swagger
The application is implemeted mainly using websockets (Read Notes section for more details).

But there is also a REST endpoint available. You can check API swagger documentation in: http://localhost:3000/swagger

The websocket is available in: `localhost:3000`

## Testing

You can run the tests using:

```bash
yarn test
```

**Note**: The main test file is `src/modules/chat/chat.gateway.spec.ts` which shows the flow of the application.

## Notes

In the task description, it is mentioned that "Design and implement a RESTful API". It is notable that a chat application should work realtime
and we must use something like websockets to achieve this.

I asked about 2 things from the task sender:

1. Should we implement the application realtime and use websockets?
2. Should we use a database or we can use an in-memory database?

But I didn't get a response from the task sender.

So I decided to implement the application using websockets. Also it is mentiond that I should implement a `simple chat application`. So for the 
sake of simplicity, I decided to use an in-memory database.

If the application must be implemented using REST and HTTP, then one
solution is to use HTTP long polling instead of websockets. HTTP long polling is a technique that allows a client to send a request to the server and it holds the connection open until new data is available. This technique is not realtime but simulates it and comes
with some drawbacks like higher latency and server resource usage due
to keeping connections open.


## TODO
- Add more test using different inputs
- User creation and authentication