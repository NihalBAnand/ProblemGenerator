
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
    document.getElementById('problem-generator').style.display = "none";
});

function openProblemSubmission() {
    document.getElementById('problem-submission').style.display = "block";
    document.getElementById('problem-generator').style.display = "none";
}

function submitProblem() {
    document.getElementById('problem-submission').style.display = "none";
    document.getElementById('problem-generator').style.display = "none";
    $.post("/problem-submission", {problem: document.getElementById("problem-text").value, rating: 0}, (data) => {
        alert(data);
    });
}

var currentProblem = ""

function generateProblem() {
    document.getElementById('problem-submission').style.display = "none";
    document.getElementById('problem-generator').style.display = "block";

    $.get("/get-problem", (data) => {
        outs = data.split(",")
        document.getElementById("problem-disp").innerText = outs[0];
        document.getElementById("rating").innerText = outs[1];
    });
}

function vote(positive){
    $.post("/problem-vote", {problem: document.getElementById("problem-disp").innerText, upvote: positive, rating: document.getElementById("rating").innerText}, (data) => {
        alert(data);
    });
}