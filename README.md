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
2. Install dependencies in both Frontend/ and back/ with: (you must do this for both directories)
```bash
npm install
```
or
```bash
yarn add
```
4. [Install docker](https://docs.docker.com/get-docker/)
5. [Install pgadmin](https://www.pgadmin.org/download/)
6. Check installation:
```bash
docker --version
</path/to/pgadminExecutable>
```
7. Initialize a postgres docker container:
```bash
sudo docker run --name <YourContainerNameHere> -p <NativePort>:<MappedPort> -e POSTGRES_PASSWORD=<YourDatabasePasswordHere> -d postgres
```
8. Open pgadmin. You may need to look around your file system for the executable. 


### Create a task

POST to `/tasks` with task details in the request body.

### Mark a task as complete

PUT to `/tasks/:id` with the updated task details.

### Delete a task

DELETE to `/tasks/:id`.

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests.
