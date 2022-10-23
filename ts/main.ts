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

// the amount of valid games that 
// have been submitted thus far
let validInput = 0;

/** 
 * This function is called when the add game button is clicked,
 * and displays the game if all form input is valid
*/
function addVideoGame():void { 
    let isAllDataValid = true;
    
    // Validate input
    if(isAllDataValid) {
        // Create new instance of game
        let currentGame:VideoGame = getVideoGame();
        // Increment valid input by 1
        validInput += 1;
        // Display game
        displayVideoGame(currentGame, validInput);
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
 * @param validInput The number of valid inputs entered until now
 */
function displayVideoGame(currentGame:VideoGame, validInput:number):void {
    // grab the div where game will be displayed
    let displayGamesDiv:HTMLElement = getByID("display-games");
    
    // create a div to contain the game info,
    // when adding attribute value, add previousGames to end
    // in order to differentiate between game containers
    let previousGames:string = validInput.toString();
    createElement("div", "id", "game-container" + previousGames, "", displayGamesDiv);

    // grab gameContainer div
    let gameContainer = getByID("game-container" + previousGames);

    // give it the game-container class
    gameContainer.setAttribute("class", "game-container");

    // add the game's title, price, rating, and release date within game container
    let gameHeading = currentGame.title;
    createElement("h2", "class", "game-info", gameHeading, gameContainer);
    
    let gamePrice = "Price: $" + currentGame.price.toFixed(2).toString();
    createElement("p", "class", "game-info", gamePrice, gameContainer);
    
    let gameRating = "Rating: " + currentGame.rating.toString()
    createElement("p", "class", "game-info", gameRating, gameContainer);
    
    let gameReleaseDate = "Release Date: " + currentGame.releaseDate;
    createElement("p", "class", "game-info", gameReleaseDate, gameContainer);
}

/**
 * Creates an element, gives it an id or class, places the specified text within it, 
 * and places the element within another specified element.
 * @param elementType The type of element being created
 * @param attributeType The attribute type (class or id)
 * @param attributeValue The name of the class or id
 * @param text The text to be placed within the element
 * @param createWithin The previously existing element within which the new element is being created.
 */
 function createElement(elementType:string, attributeType:string, attributeValue:string,  
                        text:string, createWithin:HTMLElement):void {
    // create new element
    let newElement = document.createElement(elementType);
    // set element's attribute
    newElement.setAttribute(attributeType, attributeValue)
    // set element's text
    newElement.innerText = text;

    // add element to end of specified element
    createWithin.appendChild(newElement);
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