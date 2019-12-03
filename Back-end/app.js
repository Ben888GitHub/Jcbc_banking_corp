const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

const CONNECTION_URL = "mongodb+srv://root:root@cluster0-djxyv.mongodb.net/test";
const DATABASE_NAME = "users";

var app = Express();
const cors = require("cors");
app.use(cors());

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

var database, collection;


app.get("/", (request, response) => {
    response.send('Hello');
});

app.post("/authenticate", async (request, response) => {
    let pincode = request.body.pin;
    let accname = request.body.accname;

    let client = await MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true });
    database = client.db(DATABASE_NAME);
    collection = database.collection("userlist");

    let requete = {
        'accname': accname,
        'pin': pincode
    };
    collection.find(requete).toArray((error, result) => {
        if (error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});


module.exports = app;