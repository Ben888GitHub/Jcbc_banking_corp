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
          callback(null, {
            statusCode: 500,
            body: JSON.stringify(error)
          });
          // return response.status(500).send(error);
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

exports.transfer_test = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  functions.connectToDatabase()
    .then(async collection => {
      console.log(JSON.parse(event.body));
      let source_requete = {
        $and: [
          { "accname": JSON.parse(event.body).sender_username },
          { "accounts.accnumber": JSON.parse(event.body).source_acc_num }
        ]
      };
      let sourceAccNumber = JSON.parse(event.body).source_acc_num;

      let currentAccount = await collection.findOne(source_requete);

      let currentAccList = currentAccount.accounts;
      var currentBalance = currentAccList.find(function (eachAccount) {
        if (eachAccount.accnumber === sourceAccNumber) {
          return eachAccount;
        };
      });

      let source_updateContent = {
        $set: { "accounts.$.balance": currentBalance.balance - JSON.parse(event.body).transfer_amount }
      };
      let source_result = await collection.updateOne(source_requete, source_updateContent);


      // Manipulating with the destination:
      let dest_requete = { "accounts.accnumber": JSON.parse(event.body).dest_acc_num };

      let destAccNumber = JSON.parse(event.body).dest_acc_num;

      currentAccount = await collection.findOne(dest_requete);
      if (!currentAccount) {
        callback(null, {
          statusCode: 500,
          body: JSON.stringify({ errorMessage: 'Destination account is not exist.' })
        });
      }

      currentAccList = currentAccount.accounts;
      currentBalance = currentAccList.find(function (eachAccount) {
        if (eachAccount.accnumber === destAccNumber) {
          return eachAccount;
        };
      })

      if (currentBalance.balance < JSON.parse(event.body).transfer_amount) {
        callback(null, {
          statusCode: 500,
          body: JSON.stringify({ errorMessage: 'Source balance is not sufficient.' })
        });
      }
      let dest_updateContent = {
        $set: {"account.$.balance": currentBalance.balance + JSON.parse(event.body).transfer_amount }
      };

      let dest_result = await collection.updateOne(dest_requete, dest_updateContent);
      
      let client = await MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true });
      let database = client.db(DATABASE_NAME);
      let collectionTransactions = database.collection("transactions");
      let timeStamp = JSON.stringify(Date.now());
      let transactionID = JSON.parse(event.body).sender_username + timeStamp;
      let transactionRecord = await collectionTransactions.insertOne({
        transactionID: transactionID,
        sourceaccname: JSON.parse(event.body).sender_username,
        sourceaccnum: JSON.parse(event.body).source_acc_num,
        destinationaccname: "Not Defined",
        destinationaccnum: JSON.parse(event.body).dest_acc_num,
        datestamp: timeStamp,
        sourcecurrency: "SGD",
        destinationcurrency: "SGD",
        amount: JSON.parse(event.body).transfer_amount,
      })
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({ 
          transactionRecord: transactionRecord,
          subtracting: source_result,
          adding: dest_result
        })
      });
    })
    .catch(err => {
      console.log('=> an error occurred: ', err);
      callback(err);
    })
}

// ENDING TESTING WITH THE SERVERLESS FORMAT.