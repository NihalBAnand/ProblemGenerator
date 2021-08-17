const { addListener } = require("process");

function sendToPage(page) {
    var request = new XMLHttpRequest();
    request.open("GET", "/" + page, false);
    request.send(null);
}

function updateDB() {
    var request = new XMLHttpRequest();
    request.open("GET", "/dbtest", false);
    request.send();
}

$(document).ready(() => {
	$('.header').height($(window).height());
    document.getElementById('problem-submission').style.display = "none";
});

function openProblemSubmission() {
    document.getElementById('problem-submission').style.display = "block";
}

function submitProblem() {
    document.getElementById('problem-submission').style.display = "none";
    $.post("/problem-submission", {problem: document.getElementById("problem-text").value, rating: 0}, (data) => {
        alert(data);
    });
}