var VideoGame = (function () {
    function VideoGame() {
    }
    return VideoGame;
}());
window.onload = function () {
    setupButton("add-game", addVideoGame);
};
var validInput = 0;
function addVideoGame() {
    var isAllDataValid = true;
    if (isAllDataValid) {
        var currentGame = getVideoGame();
        validInput += 1;
        displayVideoGame(currentGame, validInput);
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
function displayVideoGame(currentGame, validInput) {
    var displayGamesDiv = getByID("display-games");
    var previousGames = validInput.toString();
    createElement("div", "id", "game-container" + previousGames, "", displayGamesDiv);
    var gameContainer = getByID("game-container" + previousGames);
    gameContainer.setAttribute("class", "game-container");
    var gameHeading = currentGame.title;
    createElement("h2", "class", "game-info", gameHeading, gameContainer);
    var gamePrice = "Price: $" + currentGame.price.toFixed(2).toString();
    createElement("p", "class", "game-info", gamePrice, gameContainer);
    var gameRating = "Rating: " + currentGame.rating.toString();
    createElement("p", "class", "game-info", gameRating, gameContainer);
    var gameReleaseDate = "Release Date: " + currentGame.releaseDate;
    createElement("p", "class", "game-info", gameReleaseDate, gameContainer);
}
function createElement(elementType, attributeType, attributeValue, text, createWithin) {
    var newElement = document.createElement(elementType);
    newElement.setAttribute(attributeType, attributeValue);
    newElement.innerText = text;
    createWithin.appendChild(newElement);
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
