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
function getVideoGame() {
    var currentGame = new VideoGame();
    var titleInput = getInputById("title");
    currentGame.title = titleInput.value;
    var priceInput = getInputById("price");
    currentGame.price = parseFloat(priceInput.value);
    var ratingInput = getInputById("rating");
    currentGame.rating = parseInt(ratingInput.value);
    var releaseDateInput = getInputById("release-date");
    currentGame.releaseDate = releaseDateInput.value;
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
function isAllDataValid() {
    return true;
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
