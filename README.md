[![Build Status](https://travis-ci.org/irakozeyves1/FreeMentor.svg?branch=develop)](https://travis-ci.org/irakozeyves1/FreeMentor)
[![Coverage Status](https://coveralls.io/repos/github/irakozeyves1/FreeMentor/badge.svg?branch=develop)](https://coveralls.io/github/irakozeyves1/FreeMentor?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/805c92b1e42416c146a5/maintainability)](https://codeclimate.com/github/irakozeyves1/FreeMentor/maintainability)
## FreeMentor


Online FreeMentor app for the mentoring, this is an app where some one want a mentor can request a session for him or her 
and also some one who need to be mentor also can request for. 

## UI Tools
- HTML
- CSS
- Javascript
## Link for UI
- Github page for repo [link here](https://github.com/irakozeyves1/FreeMentor)
- Github page for user [link here](https://irakozeyves1.github.io/FreeMentor/UI)
- Github page for Mentor [link here](https://github.com/irakozeyves1/FreeMentor/blob/develop/UI/html/mentorpanel/mentorSession.html)
- Github page for Admin [link her ](https://github.com/irakozeyves1/FreeMentor/blob/develop/UI/html/adminpanel/adminpanel.html)
## Getting started with backend
Thess instruction will get you a copy of the project and running for your local machine for development and testing purposes.See installation, Running and deployment form more details. This application is built in node js with es6 and postgres for database

## Prerequisites
FreeMentor is built in node js with ES6 format. to get up the application running you need to install the following:
```
download the latest version of node js 
N.B:v10.16.1, is the latest version at the time i doing this project
```

## Installing 
You have to follow this following procedure to get started.
Currently data are being stored in json  file but hopefully I will use postgresql database for persistence data.

got version control and clone down the application .if is git hub you choose use (gitbash)

```
https://github.com/irakozeyves1/FreeMentor.git
```
To install the dependency ```npm install dependancy name ```
```
The server will automatically install all the package in the application
```
You need a testing environment like POSTMAN
```
For getting data from the app you will have to access every single API endpoint 
like localhost:3000/api/v1
```
|URL | METHOD | DESCRIPTION |
| ------ | ------ | ---------- |
| /api/v1/auth/signup | POST | User sigup into the system|
| /api/v1/auth/signin | POST |  user login or sign in into the system |
| /api/v1/user:userId | PATCH | Change user to a mentor|
| /api/v1/mentors | GET | Get all mentors|
| /api/v1/mentors/:mentorId |GET | Get specific mentor By its id |
| /api/v1/session | POST |Create a session request with Mentor |
| /api/v1/session/:sessionId/accept | PATCH |A mentor can reject a mentorship session request |
| /api/v1/sessions | GET | get all session for user(menteee ) and for mentor |
| /api/v1/sessions/:sessionId/review| DELETE | Admin can delete mentorship session review deemed inappropriate |

HEROKU LINK: (https://yvesfreementor.herokuapp.com/)[link]


## To run this project 
For nodemon use ``` npm run dev  ```
For node use ``` npm start ```
## To Run test 
use ``` npm test ```

### To built with java script 
Node /Express
### Author 
IRAKOZE Yves Erwan
### LICENSE
ISC License
Copyright (c) 2019, ``` Yves IRAKOZE ```
Its an Open source software











