# Task Management App

## Overview

A Task Management App built with TypeScript, NestJS, and Postgres.
Frontend provided by course and developed with React and MobX.

## Features

- Create, update, delete tasks
- Mark tasks as complete

## Technologies

- TypeScript
- NestJS
- Database (PostgreSQL, MongoDB, etc.)

## Installation

1. Clone the repository.
2. Install dependencies in both Frontend/ and back/ ( you must do this for both directories ):
   
```bash
npm install
```

or

```bash
yarn add
```

3. [Install docker](https://docs.docker.com/get-docker/)
5. [Install pgadmin](https://www.pgadmin.org/download/)
6. Check installation:
  
```bash
docker --version
</path/to/pgadminExecutable>
```

7. Initialize a postgres docker container:

```bash
sudo docker run
 --name <YourContainerNameHere>
 -p <NativePort>:<MappedPort>
 -e POSTGRES_PASSWORD=<YourDatabasePasswordHere>
 -e POSTGRES_DB=<YourDatabaseNameHere>
 -d postgres
```

8. Open pgadmin. You may need to look around your file system for the executable.
Mine was in `/usr/pgadmin4/bin/`.

9. Since my version is pgadmin4, I enter

```bash
 ./pgadmin4
```
in the executable directory.


11.  Create a new server group.
12. Enter a name for the database. (This will used later in the environment variables)
13. Go to connection tab.
14. Enter in relevant details.
    - Host name/address: localhost
    - Port: Mine is 5432.
    - password: From the command above, postgres
15. Now



### Create a task

POST to `/tasks` with task details in the request body.

### Mark a task as complete

PUT to `/tasks/:id` with the updated task details.

### Delete a task

DELETE to `/tasks/:id`.

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests.
