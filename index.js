const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
const url = "mongodb+srv://patilhindavi2006:8lrinTYKMny3dnQE@cluster.t70f6or.mongodb.net/?msg_30june25retryWrites=true&w=majority&appName=Cluster";
    const con = new MongoClient(url);  // No con.connect()

    const db = con.db("msg_30june25");
    const coll = db.collection("messages");

    coll.find().toArray()
        .then(response => {
            if (response.length === 0) {
                res.status(404).json({ error: "No messages found" });
            } else {
                const r = Math.floor(Math.random() * response.length);
                res.status(200).json(response[r]);  // Send JSON correctly
            }
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
});

app.listen(9000, () => {
    console.log("ready to serve@9000");
});
