# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://docs.docker.com/desktop/) and Docker Compose.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Setting up environment

```
cp .env.example .env
```

Copy `.env.example` to `.env`
Change preset variables if needed:

```
PORT: port to serve the api
CRYPT_SALT: number of rounds for password hashing

DB_HOST: database hostname
DB_PORT: database port
DB_USERNAME: database username
DB_PASSWORD: database password
DB_DATABASE: database name
```

## Building container

```
docker-compose build
```

## Running container

```
docker-compose up
```

Initial db migration will run automatically on first run.
After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

Press `Ctrl+C` to stop.

## Testing

With running container running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Run vulnerabilities audit

```
DOCKER_SCOUT_CACHE_FORMAT=tar docker scout cves
npm audit
```

### Auto-fix and format

```

npm run lint

```

```

npm run format

```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

```

```
