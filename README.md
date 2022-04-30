# About


**Groupomania** is a corporate social network built with React for the frontend part, NodeJs and Express for the backend and has a MySQL database.

It is my 7th and last project from the Web Developer training program of OpenClassRooms.

### Features

- The app allows you to create an account, login and logout
- Modify and delete the account
- Ask a new password if you forget it, and create a new one
- Create posts with text and image content, modify and delete them
-  Leave comments, modify and delete them

![Capture-groupomania](https://user-images.githubusercontent.com/48595795/166098889-2c00b52e-98d7-4aac-8122-4ee581f33d96.PNG)

## What you will need

To run Groupomania you'll need to have installed on your computer :
- NodeJS
- MySQL

## How to run it

1. Clone it with the command `git clone https://github.com/MaxenceCalifano/Groupomania.git`
2. Run `npm install` in each frontend and backend folder
3. In the backend folder, find `.env` file and type your MySQL user and password in `dbUser` and `dbPassword`
4. Open the MySQL CLI, login and create empty groupomania database `CREATE DATABASE groupomania;` and use it `USE groupomania;`
5. Import groupomania database, to do so you will need to go to MySQL server folder on your computer, which on Windows will be at something like `C:\Program Files\MySQL\MySQL Server 8.0\bin`, past `mysql -u username -p groupomania < groupomania_demo.sql`*
6. : Finnaly run `npm start` in the frontend folder and `node server` in the backend folder
