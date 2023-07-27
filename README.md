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
- Database ( PostgreSQL )

### Course Credit
   - React
   - MobX

## Installation ( local )

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


11.  Create a new server group. Name it whatever you want.
12.  Register the servers. Again, name them whatever you want.
14. Go to connection tab.
15. Enter in relevant details.
    - Host name/address: localhost
    - Port: Mine is 5432. For you, <NativePort>
    - maintenance database: From the command above, <YourDatabaseName>
    - password: From the command above, <YourDatabasePassword>
16. Now







## Contributing

Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests.
