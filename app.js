const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

app.get('/get-problem', (req, res) => {
    
    database.ref().on('value', (snapshot) => {
        var out = ""
        var problems = [];
        for (i in snapshot.val()) {
            console.log(problems.push(snapshot.val()[i]));
            
        }
        var priority = [];
        var plebes = [];
        for (i in problems) {
            if (problems[i].rating > 0) {
                priority.push(problems[i]);
            }
            else {
                plebes.push(problems[i]);
            }
        }
        var weight = Math.random() * 4;
        if(weight == 0 || priority.length == 0) {
            out = plebes[Math.random() * plebes.length].problem;
        }
        else {
            out = priority[Math.random() * priority.length].problem;
        }
        res.end(out);
    });
});

app.post('/problem-submission', (req, res) => {
    database.ref('problems/' + req.body.problem).set({
        problem: req.body.problem,
        rating: req.body.rating
    });
    console.log("Problem: " + req.body.problem + ' Rating: ' + req.body.rating);
    res.end("Success!");
});

app.post('/problem-vote', (req, res) => {
    if (req.body.upvote) {
        database.ref('problems/' + req.body.problem).set({
            problem: req.body.problem,
            rating: req.body.rating + 1
        });
    }
    else {
        database.ref('problems/' + req.body.problem).set({
            problem: req.body.problem,
            rating: req.body.rating - 1
        });
    }
    res.end("Vote submitted!");
})

app.listen(3000, () => {
    console.log("Listening on port 3000.");
});