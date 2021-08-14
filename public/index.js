function sendToPage(page) {
    var request = new XMLHttpRequest();
    request.open("GET", "192.168.86.30:3000/" + page, false);
    request.send(null);
}