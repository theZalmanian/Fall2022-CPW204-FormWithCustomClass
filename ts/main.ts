class Product{
    title:string;
    price:number;
    rating:number;
}

window.onload = function():void {
    // setup onclick event for add product button
    setupButton("add-product", addProduct);
}

/** 
 * This function is called when the add product button is clicked
*/
function addProduct():void { 
    // Validate product
}

function getProduct():Product {
    // Create product
    let currentProduct = new Product();

    // Place form data into product
    let titleTextBox = <HTMLInputElement> getByID("title");
    currentProduct.title = titleTextBox.value;

    let priceTextBox = <HTMLInputElement> getByID("price");
    currentProduct.price = parseFloat(priceTextBox.value);

    let ratingInput = <HTMLSelectElement> getByID("rating");
    currentProduct.rating = parseInt(ratingInput.value);

    // Return product
    return currentProduct;
}

function displayProduct(currentProduct:Product):void {
    // Display product below form
}

/**
 * Shortened form of the document.getElementById method
 * @param {string} id - The element's id.
 * @returns The corresponding HTML Element
 */
 function getByID(id:string):HTMLElement {
    return document.getElementById(id);
}

/**
 * Sets up an onclick event for a button.
 * @param {string} id The button's id.
 * @param {any} useFunction The function to be called when button is clicked.
 */
 function setupButton(id:string, useFunction:() => void):void {
    let button:HTMLElement = getByID(id);
    button.onclick = useFunction;
}

function isAllDataValid():boolean {
    return true;
}