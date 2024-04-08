document.addEventListener("DOMContentLoaded", function () {
    // Function to display products in the cart
    function displayProductsInCart() {
        const productCartContainer = document.getElementById('productCartContainer');
        const productCartTemplate = document.getElementById('productCartTemplate');

        // Retrieve cart items from local storage
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

        // Clear previous content in the container
        productCartContainer.innerHTML = '';

        // Iterate over each cart item and display it in the template
        cartItems.forEach(item => {
            const instance = document.importNode(productCartTemplate.content, true);

            // Construct the image source URL based on the product ID
            const imageURL = `images/product${item.id}.png`; // Assuming item.id corresponds to the product ID
            instance.querySelector('.productImage').src = imageURL;

            // Populate product details in the template
            instance.querySelector('.productName').textContent = item.name;
            instance.querySelector('.productPrice').textContent = item.price;
            instance.querySelector('.productQuantity').textContent = item.quantity;

            // Add event listener to remove button
            instance.querySelector('.remove-to-cart-button').addEventListener('click', function () {
                // Remove the item from the cart and update local storage
                cartItems.splice(cartItems.indexOf(item), 1);
                localStorage.setItem('cart', JSON.stringify(cartItems));

                // Refresh the display
                displayProductsInCart();
            });

            // Add event listener to increment button
            instance.querySelector('.cartIncrement').addEventListener('click', function () {
                item.quantity++; // Increase quantity
                localStorage.setItem('cart', JSON.stringify(cartItems));
                displayProductsInCart(); // Refresh the display
            });

            // Add event listener to decrement button
            instance.querySelector('.cartDecrement').addEventListener('click', function () {
                if (item.quantity > 1) {
                    item.quantity--; // Decrease quantity if greater than 1
                    localStorage.setItem('cart', JSON.stringify(cartItems));
                    displayProductsInCart(); // Refresh the display
                }
            });

            // Append the populated template to the container
            productCartContainer.appendChild(instance);
        });

        // Calculate and display the total price
        const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        const tax = totalPrice * 0.18;

        // Round totalPrice and tax to two decimal places
        const formattedTotalPrice = totalPrice.toFixed(2);
        const formattedTax = tax.toFixed(2);

        document.querySelector('.productSubTotal').textContent = formattedTotalPrice;
        document.querySelector('.productFinalTotal').textContent = (totalPrice + tax).toFixed(2);
        document.querySelector('.productTax').textContent = formattedTax;
        // Assuming a fixed tax amount of ₹50
    }

    // Display products in the cart when the page loads
    displayProductsInCart();
});
