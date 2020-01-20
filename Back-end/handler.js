'use strict';
const awsServerlessExpress = require("aws-serverless-express");
const app = require("./app");
const server = awsServerlessExpress.createServer(app);
const Speakeasy = require("speakeasy")
const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const functions = require('./functions');
const CONNECTION_URL = "mongodb+srv://root:root@cluster0-djxyv.mongodb.net/test";
const DATABASE_NAME = "users";
const sgMail = require('@sendgrid/mail');

exports.cp3405 = (event, context) => {
  awsServerlessExpress.proxy(server, event, context);
};

let randomNum = "";
for (let i = 0; i < 6; i++) {
  randomNum += Math.floor(Math.round(Math.random() * 9));
};

// SERVERLESS FORMAT : 

exports.sendinvoice = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  functions.connectToDatabase()
    .then(async () => {
      let toSend = new Date().getTime();
      let request_data = {
        sender_email: JSON.parse(event.body).sender_email,
        amount: JSON.parse(event.body).amount,
        sender_accnum: JSON.parse(event.body).sender_accnum,
        sender_accname: JSON.parse(event.body).sender_accname,
        receive_accnum: JSON.parse(event.body).receive_accnum,
      }
      sgMail.setApiKey("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");
      const sender_msg = {
        to: request_data.sender_email,
        from: 'admin@jcbc.com',
        subject: 'Your transfer receipt for ' + request_data.sender_email,
        html: `<h3>Here is your transfer receipt.</h1><p style = "font-family: Courier New, Courier, monospace">`
          + `<br/><br/> Your email ---------------- ${request_data.sender_email}`
          + `<br/><br/> Amount transfered --------- $${request_data.amount}`
          + `<br/><br/> Sender account name ------- ${request_data.sender_accname}`
          + `<br/><br/> Sender account number ----- ${request_data.sender_accnum}`
          + `<br/><br/> Receiver account number --- ${request_data.receive_accnum}`
          + `<br/><br/></p><h3> Thank you for using JCBC banking app. </h1>`
      };
      await sgMail.send(sender_msg);
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          request_data,
          timestamp: toSend.toString()
        })
      });
    });
}

exports.sendmail = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  functions.connectToDatabase()
    .then(async () => {
      let emailToSend = JSON.parse(event.body).email;
      let timeStamp = new Date();
      let toSend = timeStamp.getTime();
      sgMail.setApiKey("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");
      const msg = {
        to: emailToSend,
        from: 'admin@jcbc.com',
        subject: 'Your JCBC one-time password',
        html: `<h1>Your OTP for JCBC is ${randomNum}</h1>`
      };
      await sgMail.send(msg);
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          output: "Your otp is " + randomNum + " sent to " + emailToSend,
          otp: randomNum,
          timestamp: toSend.toString()
        })
      });
    });
}

exports.get_otp = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  functions.connectToDatabase()
    .then(() => {
      let response = {
        "token": Speakeasy.totp({
          secret: JSON.parse(event.body).secret,
          encoding: "base32",
        }),
        "remaining": (30 - Math.floor((new Date()).getTime() / 1000.0 % 30))
      };
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(response)
      })
    })
}

exports.check_otp = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  functions.connectToDatabase()
    .then(() => {
      let response = Speakeasy.totp.verify({
        secret: JSON.parse(event.body).secret,
        encoding: "base32",
        token: JSON.parse(event.body).token,
        window: 0
      })
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(response)
      });
    });
}

exports.getTransactions = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  functions.addTransaction()
    .then(async collection => {
      let data = await collection.find().toArray();
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(data)
      });
    });
}

exports.authenticate = (event, context, callback) => {
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

exports.save_transaction = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  functions.addTransaction().then(async collection_trans => {

    let timeStamp = JSON.stringify(Date.now());

    collection_trans.insertOne({
      transactionID: JSON.parse(event.body).sender_username + timeStamp,
      sourceaccname: JSON.parse(event.body).sender_username,
      sourceaccnum: JSON.parse(event.body).source_acc_num,
      // destinationaccname: "Not Defined",
      destinationaccnum: JSON.parse(event.body).dest_acc_num,
      datestamp: timeStamp,
      // sourcecurrency: "SGD",
      // destinationcurrency: "SGD",
      amount: JSON.parse(event.body).transfer_amount,
    }).then(result => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({ message: 'Transaction is saved.' })
      });
    });
  });
};

exports.transfer_test = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  functions.connectToDatabase()
    .then(async collection => {
      let source_requete = {
        $and: [
          { "accname": JSON.parse(event.body).sender_username },
          { "accounts.accnumber": JSON.parse(event.body).source_acc_num }
        ]
      };
      let source_number = JSON.parse(event.body).source_acc_num;
      let cash_amount = JSON.parse(event.body).transfer_amount;
      let destination_number = JSON.parse(event.body).dest_acc_num;
      let currentAccount = await collection.findOne(source_requete);

      let currentAccList = currentAccount.accounts;
      var currentBalance = currentAccList.find(function (eachAccount) {
        if (eachAccount.accnumber === source_number) {
          return eachAccount;
        };
      });

      let source_updateContent = {
        $set: { "accounts.$.balance": currentBalance.balance - JSON.parse(event.body).transfer_amount }
      };

      let dest_updateContent = {
        $set: { "accounts.$.balance": currentBalance.balance + JSON.parse(event.body).transfer_amount }
      };

      if (currentBalance.balance < cash_amount) {
        callback(null, {
          statusCode: 500,
          body: JSON.stringify({ errorMessage: 'Source balance is not sufficient.' })
        });
        return;
      } else {
        let source_result = await collection.updateOne(source_requete, source_updateContent);
        let dest_result = await collection.updateOne(dest_requete, dest_updateContent);
        callback(null, {
          statusCode: 200,
          body: JSON.stringify({
            transactionRecord: transactionRecord,
            subtracting: source_result,
            adding: dest_result
          })

        })
      }
      let dest_requete = { "accounts.accnumber": destination_number };
      currentAccount = await collection.findOne(dest_requete);
      if (!currentAccount) {
        callback(null, {
          statusCode: 500,
          body: JSON.stringify({ errorMessage: 'Destination account is not exist.' })
        });
        return;
      } else {
        currentAccList = currentAccount.accounts;
        currentBalance = currentAccList.find(function (eachAccount) {
          if (eachAccount.accnumber === destAccNumber) {
            return eachAccount;
          };
        });
      }
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
      })
    })
    .catch(err => {
      console.log('=> an error occurred: ', err);
      callback(err);
    })
}


exports.transfer = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  functions.connectToDatabase()
    .then(async collection => {
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
        return;
      }

      currentAccList = currentAccount.accounts;
      currentBalance = currentAccList.find(function (eachAccount) {
        if (eachAccount.accnumber === destAccNumber) {
          return eachAccount;
        };
      });

      if (currentBalance.balance < JSON.parse(event.body).transfer_amount) {
        callback(null, {
          statusCode: 500,
          body: JSON.stringify({ errorMessage: 'Source balance is not sufficient.' })
        });
        return;
      }
      let dest_updateContent = {
        $set: { "accounts.$.balance": currentBalance.balance + JSON.parse(event.body).transfer_amount }
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