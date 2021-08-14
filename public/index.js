function sendToPage(page) {
    var request = new XMLHttpRequest();
    request.open("GET", "/" + page, false);
    request.send(null);
}