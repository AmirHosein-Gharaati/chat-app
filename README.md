# Chat App

## Installation

### Local
You must have installed `yarn` in your machine: https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable


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

## Swagger
You can check API swagger documentation in: http://localhost:3000/swagger

The websocket is available in: `localhost:3000`

## Testing

You can run the tests using:

```bash
yarn test
```

**Note**: The main test file is `src/modules/chat/chat.gateway.spec.ts` which shows the flow of the application.