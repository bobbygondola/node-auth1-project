//connection to Database
const knex = require('knex');
const config = require('../knexfile');
//export your data connection
module.exports = knex(config.development);
//move on to migrations 
//DEBUGGING TIME!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!