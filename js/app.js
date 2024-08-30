function productsCart(params) {
    // Get product details from parent element
    const productName = params.parentNode.children[2].innerText;
    const productPrice = parseFloat(params.parentNode.children[3].children[0].innerText);

    // Disable the Product buy button
    params.classList.add('btn-disabled');

    // Add product to cart
    addProductsToCart(productName);

    // Calculate the total price
    calculatePrice(productPrice);

    // Enable the Purchase button
    removeDisabledClass('purchase-btn')
}


// Add products to cart
function addProductsToCart(productName) {
    // Get cart items
    const cartItems = document.getElementById('cart-items');
    const cartItem = document.createElement('li');
    cartItem.innerText = productName;

    cartItems.appendChild(cartItem);
}


// Enable disabled Button
function removeDisabledClass(btnName) {
    document.getElementById(btnName).classList.remove('btn-disabled');
}


// Disable Button
function addDisabledClass(btnName) {
    document.getElementById(btnName).classList.add('btn-disabled');
}


// Calculate total price
function calculatePrice(price) {
    // Get the total price
    const cartPrice = parseFloat(document.getElementById('total-price').innerText);
    let finalPrice = 0;
    
    const totalPrice = cartPrice + price;
    
    // Get the discount price
    const discountPrice = parseFloat(document.getElementById('discount').innerText);
    
    finalPrice = totalPrice + discountPrice;

    // Update the total price
    document.getElementById('total-price').innerText = totalPrice.toFixed(2);

    // Enable the Purchase button if total price is greater than or equal to 200
    if(totalPrice >= 200) {
        removeDisabledClass('coupon-btn')
    }

    // Update the final price
    document.getElementById('final-price').innerText = finalPrice.toFixed(2);
}


// Coupon functionality 
function couponBtn(params) {
    // Get the coupon code input value and total price
    const couponCode = document.getElementById('coupon-code').value;
    const totalPrice = parseFloat(document.getElementById('total-price').innerText);
    console.log(params);
    

    let discountPrice = 0;

    // Check if the coupon code is valid and apply the discount if true
    if(couponCode === 'SELL200'){

        discountPrice = totalPrice * 0.2;

        // Set the discount price
        document.getElementById('discount').innerText = discountPrice.toFixed(2);

        // Clear the coupon code
        document.getElementById('coupon-code').value = '';
    }
    else {
        // alert('Invalid coupon code');
        // paramd
        // params.setAttribute('active', 'my_modal_2.showModal()');
        // params.setAttribute('acrive', '')
        document.getElementById('my_modal_2').showModal();
        document.getElementById('coupon-code').value = '';
        return;
    }

    const finalPrice = totalPrice + discountPrice;
        
    document.getElementById('final-price').innerText = finalPrice.toFixed(2);
}




function clearEverything(params) {

    // Remove all items from the list
    const cartItems = document.getElementById('cart-items');
    while (cartItems.firstChild) {
        cartItems.removeChild(cartItems.firstChild);
    }

    // Reset the total price and discount
    document.getElementById('total-price').innerText = '00.00';
    document.getElementById('discount').innerText = '00.00';
    document.getElementById('final-price').innerText = '00.00'

    // Enable all buttons again
    const buttons = document.getElementsByTagName("button");
    for (const button of buttons) {
        button.classList.remove('btn-disabled');
    }
    
    // Disable Coupon and Purchase button
    addDisabledClass('coupon-btn');
    addDisabledClass('purchase-btn');
}