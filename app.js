const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const firebase = require('firebase/app');
const { getEnabledCategories } = require('trace_events');
require('firebase/database');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
    var out = ""
    database.ref().on('value', (snapshot) => {
        
        var problems = [];
        for (i in snapshot.val()) {
            problems.push(snapshot.val()[i]);
            
        }
        var priority = [];
        var plebes = [];
        for (i in problems) {
            for (key in problems[i]){
                if (Number(problems[i][key].rating) > 0) {
                    priority.push(problems[i][key]);
                }
                else {
                    plebes.push(problems[i][key]);
                }
            }
        }
        
        var weight = Math.round(Math.random() * 4);
        if(weight == 0 || priority.length == 0) {
            console.log(plebes[0]);
            out = plebes[getRandomInt(0, plebes.length - 1)];
        }
        else {
            out = priority[getRandomInt(0, priority.length - 1)];
        }
        //console.log(out);
        
    });
    res.end(out.problem + "," + out.rating);
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
    
    var updates = {};
    console.log(req.body.upvote)
    if (Boolean(req.body.upvote)) {
        var update = {
            problem: req.body.problem,
            rating: String(Number(req.body.rating) + 1)
        }
        
        updates['problems/' + req.body.problem] = update;
    }
    else {
        var update = {
            problem: req.body.problem,
            rating: String(Number(req.body.rating) - 1)
        }
        console.log("yeet");
        updates['problems/' + req.body.problem] = update;
    }
    firebase.database().ref().update(updates);
    res.end("Vote submitted!");
    
})

app.listen(3000, () => {
    console.log("Listening on port 3000.");
});