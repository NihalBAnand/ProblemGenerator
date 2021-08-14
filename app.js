const express = require('express');
const path = require('path');

const app = express();

app.use(function (req, res, next) {
    console.log(req.method, req.path);
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(3000, () => {
    console.log("Listening on port 3000.");
})