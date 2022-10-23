class VideoGame{
    title:string;
    price:number;
    rating:number;
    releaseDate:string;
}

window.onload = function():void {
    // setup onclick event for add game button
    setupButton("add-game", addVideoGame);
}

/** 
 * This function is called when the add game button is clicked
*/
function addVideoGame():void { 
    // Validate input
    if(isAllDataValid) {
        let currentGame:VideoGame = getVideoGame();
        displayVideoGame(currentGame);
    }
}

function getVideoGame():VideoGame {
    // Create game
    let currentGame = new VideoGame();

    // Place form data into game
    let titleInput = getInputById("title");
    currentGame.title = titleInput.value;

    let priceInput = getInputById("price");
    currentGame.price = parseFloat(priceInput.value);

    let ratingInput = getInputById("rating");
    currentGame.rating = parseInt(ratingInput.value);

    let releaseDateInput = getInputById("release-date");
    currentGame.releaseDate = releaseDateInput.value;

    // Return game
    return currentGame;
}

function displayVideoGame(currentGame:VideoGame):void {
    // Display game below form
    let displayDiv = getByID("display-games");
    
    let gameHeading = document.createElement("h2");
    gameHeading.innerText = currentGame.title;

    let price = document.createElement("p");
    price.innerText = "Price: " + currentGame.price.toString();

    let rating = document.createElement("p");
    rating.innerText = "Rating: " + currentGame.rating.toString();

    let releaseDate = document.createElement("p");
    releaseDate.innerText = "Release Date: " + currentGame.releaseDate;

    displayDiv.appendChild(gameHeading);
    displayDiv.appendChild(price);
    displayDiv.appendChild(rating);
    displayDiv.appendChild(releaseDate);
}

function isAllDataValid():boolean {
    return true;
}

/**
 * Shortened form of the document.getElementById method
 * @param id - The element's id.
 * @returns The corresponding HTML Element
 */
 function getByID(id:string):HTMLElement {
    return document.getElementById(id);
}

/**
 * Gets an HTML Input Element by it's ID
 * @param id - The element's id.
 * @returns The corresponding HTML Input Element
 */
function getInputById(id:string):HTMLInputElement {
    return <HTMLInputElement> getByID(id);
}

/**
 * Sets up an onclick event for a button.
 * @param id The button's id.
 * @param useFunction The function to be called when button is clicked.
 */
 function setupButton(id:string, useFunction:() => void):void {
    let button:HTMLElement = getByID(id);
    button.onclick = useFunction;
}