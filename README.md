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
2. [Install docker](https://docs.docker.com/get-docker/)
3. [Install pgadmin](https://www.pgadmin.org/download/)
4. Check installation:
  
```bash
docker --version
</path/to/pgadminExecutable>
```

5. Initialize a postgres docker container:

```bash
sudo docker run
 --name <YourContainerNameHere>
 -p <NativePort>:<MappedPort>
 -e POSTGRES_PASSWORD=<YourDatabasePasswordHere>
 -e POSTGRES_DB=<YourDatabaseNameHere>
 -d postgres
```

6. Open pgadmin. <br> You may need to look around your file system for the executable. <br> Mine was in `/usr/pgadmin4/bin/`.

7. Since my version is pgadmin4, I enter

```bash
 ./pgadmin4
```
   in the executable directory.


8. Create a new server group. Name it whatever you want.
![Creation](https://github.com/RyanLilleyman/taskManager/blob/main/readmeResources/creation.gif)
9. Register the servers. Again, name them whatever you want.
![Registration](https://github.com/RyanLilleyman/taskManager/blob/main/readmeResources/registration.gif)
10. Go to connection tab.
11. Enter in relevant details. Save.
    - Host name/address: localhost
    - Port: Mine is 5432. For you, <NativePort>
    - maintenance database: From the command above, <YourDatabaseName>
    - password: From the command above, <YourDatabasePassword>
 <br>
 
![Connection](https://github.com/RyanLilleyman/taskManager/blob/main/readmeResources/connect.gif)

12. Install dependencies in both Frontend/ and Backend/ **( you must do this for both directories )**:
   
```bash
npm install
```

or

```bash
yarn add
```

13. To start the server:
   - navigate to /Backend
   - Enter:
     
```bash
yarn start:dev
```
or 

```bash
npm start:dev
```










## Contributing

Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests.
