const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

const CONNECTION_URL = "none";

const DATABASE_NAME = "none";

var app = Express();
const cors = require("cors");
app.use(cors());

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

var database, collection;


app.get("/", (request, response) => {
    response.send('Hello');
});


module.exports = app;