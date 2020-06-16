//imports
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const server=express();

const dbConnection = require('./data/data-config')

//routers
const authRouter = require('./auth/auth-router');
const usersRouter = require('./users/users-router');
// const requiresAuth = require('./auth/requires-auth')

//session stuff
const session = require('express-session'); //install this
const KnexSessionStore = require('connect-session-knex')(session); //install library pass session

//session config
const sessionConfig = {
    name: 'mmm',
    secret: 'secret',
    cookie: {
      maxAge: 1000 * 60 * 10 * 6,
      secure: false,
      httpOnly: true,
    },
    resave: false,
    saveUninitialized: true,
    store: new KnexSessionStore({
      knex: dbConnection,
      createtable: true,
      clearInterval:  1000 * 60 * 60* 24, // one day
    })
  };

server.use(morgan());
server.use(helmet());
server.use(express.json());
//today stuff
server.use('/auth', authRouter);
server.use('/users', usersRouter); //add requires auth
server.use(session(sessionConfig));

module.exports = server;