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

// keeps track of the number of valid games that 
// have been submitted
let validSubmissions:number = 0;

/** 
 * This function is called when the add game button is clicked,
 * and displays the game if all form input is valid
*/
function addVideoGame():void { 
    // clear out previous errors, if any
    clearPreviousErrors();

    // check if all data is valid
    if(allDataValid()) {
        // create new instance of game
        let currentGame:VideoGame = getVideoGame();
        
        // increment valid input by 1
        validSubmissions += 1;
        
        // display game at bottom of form
        displayVideoGame(currentGame, validSubmissions);
    }
}

/**
 * Checks if all the submitted form data is valid input.
 * 
 * If all data is valid, returns true, if not returns false and displays
 * the appropriate error message(s)
 * @returns True if all data is valid, False if not
 */
function allDataValid():boolean {
    let allDataValid = true;
    
    // validate game title
    if(isInputEmpty("title")) {
        displayError("Game Title is required!");
        allDataValid = false;
    }
    
    // validate game price
    if(!isValidNumber("price")) {
        allDataValid = false;
    } 

    // validate rating
    if(isInputEmpty("rating")) {
        displayError("Your Rating is required!");
        allDataValid = false;
    }

    // validate release date
    if(!isValidDate("release-date")) {
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
 * @param validSubmissions The number of valid games submitted until now
 */
function displayVideoGame(currentGame:VideoGame, validSubmissions:number):void {
    // grab the div where games are displayed
    let displayGamesDiv:HTMLElement = getByID("display-games");
    
    // create a div to contain the game info
    // when adding attribute value, add previousGames to end
    // in order to differentiate between game containers
    let previousGames:string = validSubmissions.toString();
    createElement("div", "id", "game-container" + previousGames, "", displayGamesDiv);

    // grab the newly created div
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
 * Checks if input is empty, or made up of whitespace
 * @param id The input's id.
 * @returns True if input is empty, False if not
 */
function isInputEmpty(id:string):boolean {
    // get value from textbox
    let userInput:string = getInputByID(id).value;
    
    // check if user input is empty
    if(userInput == "" || userInput.trim() == "") {
        return true;
    }
    
    // if textbox contains text
    return false;
}

/**
 * Checks if price is a valid number. If input is not valid, displays
 * the appropriate error message(s)
 * @param id The input's id.
 * @returns True if price is a number, False if not
 */
 function isValidNumber(id:string):boolean {
    // get value from textbox, and convert to float
    let userInput:number = parseFloat(getInputByID(id).value);

    // check if empty string
    if(isInputEmpty(id)) {
        displayError("Game Price is required!");
        return false;
    } 
    
    // check if not a number
    if(isNaN(userInput)) {
        displayError("Please enter price as a number")
        return false;
    }

    // check if negative
    if(userInput < 0) {
        displayError("Please enter price as a positive number")
        return false;
    }
    
    // otherwise valid number
    return true;
}

/**
 * Checks if the date entered is formatted correctly. 
 * If date is not valid, displays the appropriate error message(s)
 * @param id The input's id
 * @returns True if date is valid, False if not.
 */
 function isValidDate(id:string):boolean {
    // get value from textbox
    let userInput:string = getInputByID(id).value;

    // check if empty string
    if(isInputEmpty(id)) {
        displayError("Release Date is required!");
        return false;
    } 
    
    // setup regular expression for validation
    // mm/dd/yyyy or m/d/yyyy
    let dateFormat = /^\d{1,2}\/\d{1,2}\/\d{4}$/g;

    // check if user input matches proper formatting
    let isDate = dateFormat.test(userInput);

    // if formatting is incorrect, show corresponding error
    if(!isDate) {
        displayError("Please enter release date as mm/dd/yyyy");
        return false;
    }
    
    // if date is formatted correctly
    return true;
}

/**
 * Displays the given error message above the form
 */
 function displayError(errorMessage:string):void {
    // grab the ul where errors are displayed
    let displayErrorsList:HTMLElement = getByID("error-list");

    // create the error message
    createElement("li", "class", "error", errorMessage, displayErrorsList);
}

/**
 * Clears out all previous errors when called
 */
function clearPreviousErrors():void {
    let errorSummary = getByID("error-list");
    errorSummary.innerHTML = "";
}

/**
 * Creates an element within another specified element. Gives the element an attribute
 * (class or id), and places the specified text within it (if any)
 * @param elementType The type of element being created (ex. h2)
 * @param attributeType The attribute type (class or id)
 * @param attributeValue The name of the class or id
 * @param text The text to be placed within the element
 * @param createWithin The previously existing element within which the new element is being created
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