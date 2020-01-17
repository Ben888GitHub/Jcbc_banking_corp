const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const functions = require('./functions');
const CONNECTION_URL = "mongodb+srv://root:root@cluster0-djxyv.mongodb.net/test";
const DATABASE_NAME = "users";
const Speakeasy = require("speakeasy");

var app = Express();
const cors = require("cors");
app.use(cors());

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

app.get("/", (request, response) => {
    response.send('Hello');
});

app.post("/get-otp", (request, response, next) => {
    response.send({
        "token": Speakeasy.totp({
            secret: request.body.secret,
            encoding: "base32"
        }),
        "remaining": (30 - Math.floor((new Date()).getTime() / 1000.0 % 30))
    });
});

app.post("/check-otp", (request, response, next) => {
    response.send({
        "valid": Speakeasy.totp.verify({
            secret: request.body.secret,
            encoding: "base32",
            token: request.body.token,
            window: 0
        })
    });
});

module.exports = app;