const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

const CONNECTION_URL = "mongodb+srv://root:root@cluster0-djxyv.mongodb.net/test";
const DATABASE_NAME = "users";

var app = Express();
const cors = require("cors");
app.use(cors());

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

var database, collection;

async function transfer(transferData) {
    let client = await MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true });
    database = client.db(DATABASE_NAME);
    collection = database.collection("userlist");

    // Manipulating with the source:
    let source_requete = {
        $and: [
            { "accname": transferData.sender_username },
            { "accounts.accnumber": transferData.source_acc_num }
        ]
    };

    let sourceAccNumber = transferData.source_acc_num;

    let currentAccount = await collection.findOne(source_requete);

    let currentAccList = currentAccount.accounts;
    var currentBalance = currentAccList.find(function (eachAccount) {
        if (eachAccount.accnumber === sourceAccNumber) {
            return eachAccount;
        };
    });

    let source_updateContent = {
        $set: { "accounts.$.balance": currentBalance.balance - transferData.transfer_amount }
    };
    let source_result = await collection.updateOne(source_requete, source_updateContent);


    // Manipulating with the destination:
    let dest_requete = { "accounts.accnumber": transferData.dest_acc_num };

    let destAccNumber = transferData.dest_acc_num;

    currentAccount = await collection.findOne(dest_requete);
    if (!currentAccount) {
        console.log('Destination account is not exist.');
        response.status(500).send({ errorMessage: 'Destination account is not exist.' });
        return;
    };

    currentAccList = currentAccount.accounts;
    currentBalance = currentAccList.find(function (eachAccount) {
        if (eachAccount.accnumber === destAccNumber) {
            return eachAccount;
        };
    });

    if (currentBalance.balance < transferData.transfer_amount) {
        response.status(500).send({ errorMessage: 'Source balance is not sufficient.' });
        return;
    };

    let dest_updateContent = {
        $set: { "accounts.$.balance": currentBalance.balance + transferData.transfer_amount }
    };
    let dest_result = await collection.updateOne(dest_requete, dest_updateContent);

    let collectionTransactions = database.collection("transactions");
    let timeStamp = JSON.stringify(Date.now());
    let transactionID = transferData.sender_username + timeStamp;
    let transactionRecord = await collectionTransactions.insertOne({
        transactionid: transactionID,
        sourceaccname: transferData.sender_username,
        sourceaccnum: transferData.source_acc_num,
        destinationaccname: "Not Defined",
        destinationaccnum: transferData.dest_acc_num,
        datestamp: timeStamp,
        sourcecurrency: "SGD",
        destinationcurrency: "SGD",
        amount: transferData.transfer_amount,
    });

    let toReturn = {
        transactionRecord: transactionRecord,
        substracting: source_result,
        adding: dest_result
    };
    return toReturn;
}

module.exports.transfer = transfer;
