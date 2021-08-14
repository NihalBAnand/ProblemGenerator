const express = require('express');
const path = require('path');
const firebaseadmin = require('firebase-admin');

firebaseadmin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://problem-generator-322719-default-rtdb.firebaseio.com"
});

var db = firebaseadmin.database();
var ref = db.ref();
ref.child('problems').child('1289nfj328').set({
    problem: "I can't open my refrigerator",
    rating: "-10"
});

const app = express();

app.use(function (req, res, next) {
    console.log(req.method, req.path);
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/about.html'))
})

app.listen(3000, () => {
    console.log("Listening on port 3000.");
})