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
    // Clear out previous errors
    clearPreviousErrors();

    // Check if all data is valid
    let allValid = isValid();
    
    // Validate input
    if(allValid) {
        // Create new instance of game
        let currentGame:VideoGame = getVideoGame();
        // Increment valid input by 1
        validInput += 1;
        // Display game
        displayVideoGame(currentGame, validInput);
    }
}

/**
 * Checks if all the submitted form data is valid input.
 * 
 * If all data is valid, returns true, if not returns false and displays
 * the appropriate error message(s)
 * @returns True if all data is valid, False if not
 */
function isValid():boolean {
    let allDataValid = true;
    
    // validate game title
    if(isInputEmpty("title")) {
        displayError("Please enter a title");
        allDataValid = false;
    }
    
    // validate game price
    if(!isPriceValid("price")) {
        allDataValid = false;
    } 

    // validate rating
    if(isInputEmpty("rating")) {
        displayError("Please select your rating");
        allDataValid = false;
    }

    // validate release date
    if(!isDateValid("release-date")) {
        allDataValid = false;
    }

    return allDataValid;
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
    currentGame.title       = getInputByID("title").value;
    currentGame.price       = parseFloat(getInputByID("price").value);
    currentGame.rating      = parseInt(getInputByID("rating").value);
    currentGame.releaseDate = getInputByID("release-date").value;

    // returns new instance of VideoGame
    return currentGame;
}

/**
 * Displays the latest form submission at the bottom of the page
 * @param currentGame The current form submission
 * @param validInput The number of valid inputs entered until now
 */
function displayVideoGame(currentGame:VideoGame, validInput:number):void {
    // grab the div where games are displayed
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
 * Checks if input is an empty string
 * @param id The input's id.
 * @returns True if input is empty, False if not
 */
function isInputEmpty(id:string):boolean {
    // get value from textbox
    let inputValue:string = getInputByID(id).value;
    
    // check if empty string
    if(inputValue == "") {
        return true;
    }
    else {
        return false;
    }
}

/**
 * Checks if price is a valid number. If price is not valid, displays
 * the appropriate error message(s)
 * @param id The input's id.
 * @returns True if price is a number, False if not
 */
 function isPriceValid(id:string):boolean {
    // get value from textbox
    let inputValue:string = getInputByID(id).value;

    // check if empty string
    if(isInputEmpty(id)) {
        displayError("Please enter a price");
        return false;
    } 
    
    // check if not a number
    if( isNaN(parseFloat(inputValue)) ) {
        displayError("Please enter price as a number")
        return false;
    }

    // check if negative
    if(parseFloat(inputValue) < 0) {
        displayError("Please enter price as a positive number")
        return false;
    }
    
    // otherwise valid number
    else {
        return true;
    }
}

/**
 * Checks if the date entered is formatted correctly. 
 * If date is not valid, displays the appropriate error message(s)
 * @param id The input's id
 * @returns True if date is valid, False if not.
 */
 function isDateValid(id:string):boolean {
    // get value from textbox
    let inputValue:string = getInputByID(id).value;

    // check if empty string
    if(isInputEmpty(id)) {
        displayError("Please enter a release date");
        return false;
    } 
    
    // setup regular expression for validation
    // mm/dd/yyyy or m/d/yyyy
    let dateFormat = /^\d{1,2}\/\d{1,2}\/\d{4}$/g;

    // test if user input matches proper formatting
    let isDate = dateFormat.test(inputValue);

    // if formatting is incorrect, show corresponding error
    if (isDate == false) {
        displayError("Please enter release date as mm/dd/yyyy");
        return false;
    }
    else {
        return true;
    }
}

/**
 * Clears out all previous errors when called
 */
function clearPreviousErrors():void {
    let errorSummary = getByID("error-list");
    errorSummary.innerHTML = "";
}

/**
 * Displays the given error message
 */
function displayError(errorMessage:string):void {
    // grab the ul where errors are displayed
    let displayErrorsList:HTMLElement = getByID("error-list");

    // create the error message
    createElement("li", "class", "error", errorMessage, displayErrorsList);
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

    // add element within specified element
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
 * @param id - The input's id.
 * @returns The corresponding HTML Input Element
 */
function getInputByID(id:string):HTMLInputElement {
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