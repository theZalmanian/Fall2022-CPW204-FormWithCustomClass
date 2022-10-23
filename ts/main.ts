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
 * This function is called when the add game button is clicked,
 * and displays the game if all form input is valid
*/
function addVideoGame():void { 
    // Validate input
    if(isAllDataValid) {
        let currentGame:VideoGame = getVideoGame();
        displayVideoGame(currentGame);
    }
}

function isAllDataValid():boolean {
    return true;
}

/**
 * Creates a new VideoGame object and populates it with
 * data from the form
 * @returns The new VideoGame object
 */
function getVideoGame():VideoGame {
    // create new instance of VideoGame
    let currentGame:VideoGame = new VideoGame();

    // place form data into game
    currentGame.title = getInputById("title").value;
    currentGame.price  = parseFloat(getInputById("price").value);
    currentGame.rating = parseInt(getInputById("rating").value);
    currentGame.releaseDate = getInputById("release-date").value;

    // returns new instance of VideoGame
    return currentGame;
}

/**
 * Displays the latest form submission at the bottom of the page
 * @param currentGame The current form submission
 */
function displayVideoGame(currentGame:VideoGame):void {
    // grab the div where game will be displayed
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