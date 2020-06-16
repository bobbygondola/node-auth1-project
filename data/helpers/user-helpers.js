//connect to the DB connection
const db = require('../data-config');

//get Data Using Knex/SQL query Language!!!!
//almost done!!!

//get
function getUsers(){
    return db('users')
}

function getSpecificUser(id){
    return db('users')
    .where({id})
}

function addUser(user){
    return db('users')
    .insert(user)
}

function findBy(filter) {
    return db("users").where(filter).orderBy("id");
  }

module.exports = {
    getUsers,
    getSpecificUser,
    addUser,
    findBy
}