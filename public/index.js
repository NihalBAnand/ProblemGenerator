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