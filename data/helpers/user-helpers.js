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

module.exports = {
    getUsers,
    getSpecificUser
}