const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());

Notizen = require("./models/notizen");

mongoose.connect("mongodb://localhost/notizendb");
const db = mongoose.connection;

app.get("/", function (req,res) {
    res.send("Please use api/notizen");
});
app.get("/api/notizen", function(req,res) {
    Notizen.getNotiz( function(err, notiz) {
        if(err) {
            throw err;
        }
        res.json(notiz);
    });
});
app.listen(3000);
console.log("Running on Port 3000");