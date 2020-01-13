const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const functions = require('./functions');
const CONNECTION_URL = "mongodb+srv://root:root@cluster0-djxyv.mongodb.net/test";
const DATABASE_NAME = "users";

var app = Express();
const cors = require("cors");
app.use(cors());

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

var database, collection;

const sgMail = require('@sendgrid/mail');

let randomNum = ""
for (i = 0; i < 6; i++) {
    randomNum += Math.floor(Math.round(Math.random() * 9))
}


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

    let sampleRequest = {
        "sender_username": request.body.sender_username,
        "source_acc_num": request.body.source_acc_num,
        "transfer_amount": request.body.transfer_amount,
        // "receiver_username": "1",
        "dest_acc_num": request.body.dest_acc_num,
    };

    let repondre = functions.transfer(sampleRequest);

    response.status(200).send(repondre);
});

app.post("/transfer_byqr", async (request, response) => {

    let sampleRequest = {
        "sender_username": request.body.sender_username,
        "source_acc_num": request.body.source_acc_num,
        "transfer_amount": request.body.transfer_amount,
        // "receiver_username": "1",
        "dest_acc_num": request.body.qrcode,
    };

    let repondre = functions.transfer(sampleRequest);

    response.status(200).send(repondre);
});

app.post("/sendmail", async function (req, res) {
    let emailToSend = req.body.email;
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
    res.send({
        output: "Your otp is " + randomNum + " sent to " + emailToSend,
        otp: randomNum,
        timestamp: toSend.toString()
    });
});

module.exports = app;