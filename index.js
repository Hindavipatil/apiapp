const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    const url = "mongodb+srv://patilhindavi2006:8lrinTYKMny3dnQE@cluster.t70f6or.mongodb.net/msg_30june25?retryWrites=true&w=majority&appName=Cluster";
;  
    const client = new MongoClient(url);
    const db = client.db("msg_30june25");
    const coll = db.collection("messages");

    coll.find().toArray()
        .then(response => {
            const r = parseInt(Math.random() * response.length);
            res.status(200).send(response[r]);
        })
        .catch(error => {
            res.status(500).send(error);
        });
});

app.listen(9000, () => {
    console.log("ready to serve @ 9000");
});