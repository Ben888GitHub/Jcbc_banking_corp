'use strict';
const awsServerlessExpress = require("aws-serverless-express");
const app = require("./app");
const server = awsServerlessExpress.createServer(app);

const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const functions = require('./functions');
const CONNECTION_URL = "mongodb+srv://root:root@cluster0-djxyv.mongodb.net/test";
const DATABASE_NAME = "users";

exports.cp3405 = (event, context) => {
  awsServerlessExpress.proxy(server, event, context);
};


// TESTING WITH THE SERVERLESS FORMAT:

exports.authenticate_test = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  functions.connectToDatabase()
    .then(collection => {
      console.log(JSON.parse(event.body));
      let requete = {
        'accname': JSON.parse(event.body).accname,
        'pin': JSON.parse(event.body).pin,
      };
      collection.find(requete).toArray((error, result) => {
        if (error) {
          return response.status(500).send(error);
        }
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(result)
        });
      });
    })
    .catch(err => {
      console.log('=> an error occurred: ', err);
      callback(err);
    });
};

// ENDING TESTING WITH THE SERVERLESS FORMAT.