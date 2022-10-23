var VideoGame = (function () {
    function VideoGame() {
    }
    return VideoGame;
}());
window.onload = function () {
    setupButton("add-game", addVideoGame);
};
function addVideoGame() {
    if (isAllDataValid) {
        var currentGame = getVideoGame();
        displayVideoGame(currentGame);
    }
}
function isAllDataValid() {
    return true;
}
function getVideoGame() {
    var currentGame = new VideoGame();
    currentGame.title = getInputById("title").value;
    currentGame.price = parseFloat(getInputById("price").value);
    currentGame.rating = parseInt(getInputById("rating").value);
    currentGame.releaseDate = getInputById("release-date").value;
    return currentGame;
}
function displayVideoGame(currentGame) {
    var displayDiv = getByID("display-games");
    var gameHeading = document.createElement("h2");
    gameHeading.innerText = currentGame.title;
    var price = document.createElement("p");
    price.innerText = "Price: " + currentGame.price.toString();
    var rating = document.createElement("p");
    rating.innerText = "Rating: " + currentGame.rating.toString();
    var releaseDate = document.createElement("p");
    releaseDate.innerText = "Release Date: " + currentGame.releaseDate;
    displayDiv.appendChild(gameHeading);
    displayDiv.appendChild(price);
    displayDiv.appendChild(rating);
    displayDiv.appendChild(releaseDate);
}
function getByID(id) {
    return document.getElementById(id);
}
function getInputById(id) {
    return getByID(id);
}
function setupButton(id, useFunction) {
    var button = getByID(id);
    button.onclick = useFunction;
}
