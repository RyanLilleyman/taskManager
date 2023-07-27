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
2. Install dependencies with `npm install`.
3. Configure your database in `ormconfig.json`.
4. Run the app with `npm run start`.

## Usage

1. [Install docker](https://docs.docker.com/get-docker/)
2. [Install pgadmin](https://www.pgadmin.org/download/)
3. Check installation:
```bash
docker --version
</path/to/pgadminExecutable>
```

### Create a task

POST to `/tasks` with task details in the request body.

### Mark a task as complete

PUT to `/tasks/:id` with the updated task details.

### Delete a task

DELETE to `/tasks/:id`.

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests.
