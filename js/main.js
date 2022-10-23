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
    clearPreviousErrors();
    var allValid = isValid();
    if (allValid) {
        var currentGame = getVideoGame();
        validInput += 1;
        displayVideoGame(currentGame, validInput);
    }
}
function isValid() {
    var allDataValid = true;
    if (isInputEmpty("title")) {
        displayError("Please enter a title");
        allDataValid = false;
    }
    if (!isPriceValid("price")) {
        allDataValid = false;
    }
    if (isInputEmpty("rating")) {
        displayError("Please select your rating");
        allDataValid = false;
    }
    if (!isDateValid("release-date")) {
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
function isInputEmpty(id) {
    var inputValue = getInputByID(id).value;
    if (inputValue == "") {
        return true;
    }
    else {
        return false;
    }
}
function isPriceValid(id) {
    var inputValue = getInputByID(id).value;
    if (isInputEmpty(id)) {
        displayError("Please enter a price");
        return false;
    }
    if (isNaN(parseFloat(inputValue))) {
        displayError("Please enter price as a number");
        return false;
    }
    if (parseFloat(inputValue) < 0) {
        displayError("Please enter price as a positive number");
        return false;
    }
    else {
        return true;
    }
}
function isDateValid(id) {
    var inputValue = getInputByID(id).value;
    if (isInputEmpty(id)) {
        displayError("Please enter a release date");
        return false;
    }
    var dateFormat = /^\d{1,2}\/\d{1,2}\/\d{4}$/g;
    var isDate = dateFormat.test(inputValue);
    if (isDate == false) {
        displayError("Please enter release date as mm/dd/yyyy");
        return false;
    }
    else {
        return true;
    }
}
function clearPreviousErrors() {
    var errorSummary = getByID("error-list");
    errorSummary.innerHTML = "";
}
function displayError(errorMessage) {
    var displayErrorsList = getByID("error-list");
    createElement("li", "class", "error", errorMessage, displayErrorsList);
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
