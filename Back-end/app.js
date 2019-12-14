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

app.post("/transfer", async (request, response) => {

    let client = await MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true });
    database = client.db(DATABASE_NAME);
    collection = database.collection("userlist");

    let sampleRequest = {
        "sender_username": "1",
        "source_acc_num": "1",
        "transfer_amount": 1,
        "receiver_username": "1",
        "dest_acc_num": "1",
    };


    // Manipulating with the source:
    let source_requete = {
        $and: [
            { "accname": request.body.sender_username },
            { "accounts.accnumber": request.body.source_acc_num }
        ]
    };

    let sourceAccNumber = request.body.source_acc_num;

    let currentAccount = await collection.findOne(source_requete);



    let currentAccList = currentAccount.accounts;
    var currentBalance = currentAccList.find(function (eachAccount) {
        if (eachAccount.accnumber === sourceAccNumber) {
            return eachAccount;
        };
    });

    let source_updateContent = {
        $set: { "accounts.$.balance": currentBalance.balance - request.body.transfer_amount }
    };
    let source_result = await collection.updateOne(source_requete, source_updateContent);


    // Manipulating with the destination:
    let dest_requete = { "accounts.accnumber": request.body.dest_acc_num };

    let destAccNumber = request.body.dest_acc_num;

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

    if (currentBalance.balance < request.body.transfer_amount) {
        response.status(500).send({ errorMessage: 'Source balance is not efficient.' });
        return;
    };

    let dest_updateContent = {
        $set: { "accounts.$.balance": currentBalance.balance + request.body.transfer_amount }
    };
    let dest_result = await collection.updateOne(dest_requete, dest_updateContent);

    response.status(200).send({
        substracting: source_result,
        adding: dest_result
    });
});


module.exports = app;