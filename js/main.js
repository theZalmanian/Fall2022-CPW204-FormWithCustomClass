var Product = (function () {
    function Product() {
    }
    return Product;
}());
window.onload = function () {
    setupButton("add-product", addProduct);
};
function addProduct() {
    if (isAllDataValid) {
        var currentProduct = getProduct();
        displayProduct(currentProduct);
    }
}
function getProduct() {
    var currentProduct = new Product();
    var titleTextBox = getByID("title");
    currentProduct.title = titleTextBox.value;
    var priceTextBox = getByID("price");
    currentProduct.price = parseFloat(priceTextBox.value);
    var ratingInput = getByID("rating");
    currentProduct.rating = parseInt(ratingInput.value);
    return currentProduct;
}
function displayProduct(currentProduct) {
    var displayDiv = getByID("display-product");
    var productHeading = document.createElement("h2");
    productHeading.innerText = currentProduct.title;
    var price = document.createElement("p");
    price.innerText = "Price: " + currentProduct.price.toString();
    var rating = document.createElement("p");
    rating.innerText = "Rating: " + currentProduct.rating.toString();
    displayDiv.appendChild(productHeading);
    displayDiv.appendChild(price);
    displayDiv.appendChild(rating);
}
function getByID(id) {
    return document.getElementById(id);
}
function setupButton(id, useFunction) {
    var button = getByID(id);
    button.onclick = useFunction;
}
function isAllDataValid() {
    return true;
}
