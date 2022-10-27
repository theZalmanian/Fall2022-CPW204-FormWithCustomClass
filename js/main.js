var VideoGame = (function () {
    function VideoGame() {
    }
    return VideoGame;
}());
window.onload = function () {
    setupButton("add-game", addVideoGame);
};
var validSubmissions = 0;
function addVideoGame() {
    clearPreviousErrors();
    if (allDataValid()) {
        var currentGame = getVideoGame();
        validSubmissions += 1;
        displayVideoGame(currentGame, validSubmissions);
    }
}
function allDataValid() {
    var allDataValid = true;
    if (isInputEmpty("title")) {
        displayError("Game Title is required!");
        allDataValid = false;
    }
    if (!isValidNumber("price")) {
        allDataValid = false;
    }
    if (isInputEmpty("rating")) {
        displayError("Your Rating is required!");
        allDataValid = false;
    }
    if (!isValidDate("release-date")) {
        allDataValid = false;
    }
    return allDataValid;
}
function getVideoGame() {
    var currentGame = new VideoGame();
    currentGame.title = getInputByID("title").value;
    currentGame.price = parseFloat(getInputByID("price").value);
    currentGame.rating = parseInt(getInputByID("rating").value);
    currentGame.releaseDate = getInputByID("release-date").value;
    return currentGame;
}
function displayVideoGame(currentGame, validSubmissions) {
    var displayGamesDiv = getByID("display-games");
    var previousGames = validSubmissions.toString();
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
function isInputEmpty(id) {
    var userInput = getInputByID(id).value;
    if (userInput == "" || userInput.trim() == "") {
        return true;
    }
    return false;
}
function isValidNumber(id) {
    var userInput = parseFloat(getInputByID(id).value);
    if (isInputEmpty(id)) {
        displayError("Game Price is required!");
        return false;
    }
    if (isNaN(userInput)) {
        displayError("Please enter price as a number");
        return false;
    }
    if (userInput < 0) {
        displayError("Please enter price as a positive number");
        return false;
    }
    return true;
}
function isValidDate(id) {
    var userInput = getInputByID(id).value;
    if (isInputEmpty(id)) {
        displayError("Release Date is required!");
        return false;
    }
    var dateFormat = /^\d{1,2}\/\d{1,2}\/\d{4}$/g;
    var isDate = dateFormat.test(userInput);
    if (!isDate) {
        displayError("Please enter release date as mm/dd/yyyy");
        return false;
    }
    return true;
}
function displayError(errorMessage) {
    var displayErrorsList = getByID("error-list");
    createElement("li", "class", "error", errorMessage, displayErrorsList);
}
function clearPreviousErrors() {
    var errorSummary = getByID("error-list");
    errorSummary.innerHTML = "";
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
function getInputByID(id) {
    return getByID(id);
}
function setupButton(id, useFunction) {
    var button = getByID(id);
    button.onclick = useFunction;
}
