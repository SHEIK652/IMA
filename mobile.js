document.addEventListener('DOMContentLoaded', () => {
    const addToCartButton = document.getElementById('add-to-cart');
    const priceElement = document.getElementById('price');
    const cartCount = document.getElementById('cart-count');
    const productImage = document.getElementById('product-image');
    const cartIcon = document.querySelector('.cart a');
    const quantityElement = document.getElementById('quantity');
    const increaseButton = document.getElementById('increase-quantity');
    const decreaseButton = document.getElementById('decrease-quantity');
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let quantity = parseInt(quantityElement.textContent);

    if (!addToCartButton || !priceElement || !cartCount || !productImage || !cartIcon || !quantityElement || !increaseButton || !decreaseButton) {
        console.error('One or more elements are missing.');
        return;
    }

    updateCartCount();
    updateCartTotal();

    // Event to increase quantity
    increaseButton.addEventListener('click', () => {
        quantity++;
        quantityElement.textContent = quantity;
    });

    // Event to decrease quantity
    decreaseButton.addEventListener('click', () => {
        if (quantity > 1) {
            quantity--;
            quantityElement.textContent = quantity;
        }
    });

    // Add product to cart
    addToCartButton.addEventListener('click', () => {
        const product = {
            name: 'IPhone 15',  // Change product name dynamically for other products
            price: parseFloat(priceElement.textContent.replace('₹', '').replace(',', '')),
            quantity: quantity
        };

        addToCart(product);
        animateProductToCart(productImage, cartIcon);
    });

    // Add product to the cart and store in localStorage
    function addToCart(product) {
        const existingProductIndex = cart.findIndex(item => item.name === product.name);
        if (existingProductIndex >= 0) {
            cart[existingProductIndex].quantity += product.quantity;
        } else {
            cart.push(product);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        updateCartTotal();
    }

    // Update the cart count icon
    function updateCartCount() {
        const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalQuantity;
    }

    // Update the total cost in the cart modal
    function updateCartTotal() {
        const totalCostElement = document.getElementById('total-cost');
        const totalCost = cart.reduce((total, item) => {
            const price = parseFloat(item.price);
            return total + (isNaN(price) ? 0 : price * item.quantity);
        }, 0);
        totalCostElement.textContent = `Total: ₹${totalCost.toFixed(2)}`;
    }

    // Animate product image when added to the cart
    function animateProductToCart(productImage, cartIcon) {
        const clone = productImage.cloneNode(true);
        const rect = productImage.getBoundingClientRect();
        const cartRect = cartIcon.getBoundingClientRect();

        clone.style.position = 'absolute';
        clone.style.top = `${rect.top}px`;
        clone.style.left = `${rect.left}px`;
        clone.style.width = `${rect.width}px`;
        clone.style.transition = 'all 1s ease-in-out';
        clone.style.zIndex = '1000';

        document.body.appendChild(clone);

        setTimeout(() => {
            clone.style.top = `${cartRect.top}px`;
            clone.style.left = `${cartRect.left}px`;
            clone.style.width = '50px';
            clone.style.opacity = '0';
        }, 10);

        setTimeout(() => {
            document.body.removeChild(clone);
        }, 1010);
    }

    // Modal logic for displaying cart items
    const modal = document.getElementById("cart-modal");
    const closeModal = document.querySelector(".close");

    if (modal && closeModal) {
        cartIcon.addEventListener("click", function (event) {
            event.preventDefault();
            populateCartModal();
            modal.style.display = "block";
        });

        closeModal.addEventListener("click", function () {
            modal.style.display = "none";
        });

        window.addEventListener("click", function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    } else {
        console.error('Modal or close button is missing.');
    }

    // Populate modal with cart items
    function populateCartModal() {
        const cartItems = document.getElementById("cart-items");
        cartItems.innerHTML = "";

        if (cart.length === 0) {
            cartItems.innerHTML = "<p>Your cart is empty.</p>";
            return;
        }

        cart.forEach((item, index) => {
            const price = parseFloat(item.price);
            const totalItemCost = (price * item.quantity).toFixed(2);

            cartItems.innerHTML += `
                <div class="cart-item">
                    <p><strong>Product:</strong> ${item.name}</p>
                    <p><strong>Price per unit:</strong> ₹${price.toFixed(2)}</p>
                    <p><strong>Quantity:</strong> ${item.quantity}</p>
                    <p><strong>Total Item Cost:</strong> ₹${totalItemCost}</p>
                    <button class="remove-item" data-index="${index}">Remove</button>
                    <hr>
                </div>
            `;
        });

        updateCartTotal();

        // Add event listeners to remove buttons
        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const index = parseInt(event.target.getAttribute('data-index'));
                removeFromCart(index);
            });
        });
    }

    // Remove item from the cart
    function removeFromCart(index) {
        if (index >= 0 && index < cart.length) {
            cart.splice(index, 1); // Remove the item from the cart array
            localStorage.setItem('cart', JSON.stringify(cart)); // Update local storage
            updateCartCount();
            updateCartTotal();
            populateCartModal(); // Re-populate the modal

            // Check if cart is empty and update icon count
            if (cart.length === 0) {
                cartCount.textContent = '0';
            }
        }
    }
});
