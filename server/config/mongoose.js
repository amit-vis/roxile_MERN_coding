// connecting to database
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.mongoUrl);

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error in connecting to database"));

db.once('open', ()=>{
    console.log("Database connected to mongodb successfully")
})

module.exports = db;