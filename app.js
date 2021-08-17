const express = require('express');
const path = require('path');
const firebase = require('firebase/app');
require('firebase/database');

var firebaseConfig = {
    apiKey: "AIzaSyACqeTWFvKpSnTfAnzbS6H5WvGywYaHDl0",
    authDomain: "problem-generator-322719.firebaseapp.com",
    databaseURL: "https://problem-generator-322719-default-rtdb.firebaseio.com",
    projectId: "problem-generator-322719",
    storageBucket: "problem-generator-322719.appspot.com",
    messagingSenderId: "429546641969",
    appId: "1:429546641969:web:5657c384b029009ea89310",
    measurementId: "G-P9Q15LPPTB"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

const app = express();

app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
    
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/about.html'))
});

app.get('/dbtest', (req, res) => {
    
});

app.listen(3000, () => {
    console.log("Listening on port 3000.");
});