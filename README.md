# About

**Groupomania** is a corporate social network built with React for the frontend part, NodeJs and Express for the backend and has a MySQL database.

It is my 7th and last project from the Web Developer training program of OpenClassRooms.

## Prerequisites

To run Groupomania you'll need to have installed on your computer :
- NodeJS
- MySQL

## How to run it

- [ ] Step 1 : Clone it with the command `git clone https://github.com/MaxenceCalifano/Groupomania.git`
- [ ] Step 2 : Run `npm install` in each folder frontend and backend
- [ ] Step 3 : In the backend folder, find `.env` file, and type your MySQL user and password in `dbUser` and `dbPassword`
- [ ] Step 4 : Open the MySQL CLI, login and create empty groupomania database `CREATE DATABASE groupomania;` and use it `USE groupomania;`
- [ ] Step 5 : Import groupomania database, to do so you will need to go to MySQL server folder on your computer, which on Windows will be at something like `C:\Program Files\MySQL\MySQL Server 8.0\bin`, past `mysql -u username -p groupomania < groupomania_demo.sql`*
- [ ] Step 6 : Finnaly run `npm start` in the frontend folder and `node server` in the backend folder
