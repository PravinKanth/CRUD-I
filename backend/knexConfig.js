const knex = require("knex");

const db = knex({
    client:'pg',
    connection:{
        host:"localhost",
        user:"postgres",
        password:"12345",
        database:"CRUD"

    }
})

module.exports=db;