/*const mysql = require("mysql");
const dbConfig = require("./config/db.config.js");

// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});*/

const mongoose = require('mongoose');
const uri = process.env.ATLAS_URI;
mongoose.connect('mongodb+srv://**:**@cluster0.blo0u.mongodb.net/dbname?retryWrites=true&w=majority', { useNewUrlParser: true, useCreateIndex: true}
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

module.exports = connection;
