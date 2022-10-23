var Product = (function () {
    function Product() {
    }
    return Product;
}());
window.onload = function () {
    setupButton("add-product", addProduct);
};
function addProduct() {
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
