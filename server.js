//imports
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');//named after dexter

//declare a server..which is imported to index.js
const server=express();
//middleware
server.use(morgan());
server.use(helmet());
server.use(express.json());//most important!!!

//import the helpers/db
const db = require('./data/helpers/user-helpers')

//export the server
module.exports = server;

//function 
//all functions/ requests need req,res...req, is the request to the server.. res, is the response from..
server.get('/', (req,res) => {
    res.status(200).json({api: "is up, hello youtube!!!"})
})

server.get('/users', (req,res) => {
    db.getUsers()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err =>{
        console.log("this is an error from gets", err)
        res.status(500).json({Message: "sorry bud"})
    })
})

server.get('/users/:id', (req,res) => {
    const id = req.params.id

    db.getSpecificUser(id)
    .then(user => {
        res.status(200).json(user)
    })
})

//THATS IT!! A WHOLE SERVER AND DATABASE!!!