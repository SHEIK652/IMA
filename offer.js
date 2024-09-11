document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.querySelector('.menu-icon');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    menuIcon.addEventListener('click', () => {
        dropdownMenu.classList.toggle('show');
    });

    // Close the dropdown menu if clicked outside
    window.addEventListener('click', function(event) {
        if (!menuIcon.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.remove('show');
        }
    });
});

// script.js
document.addEventListener('DOMContentLoaded', () => {
    const cartSidebar = document.getElementById('cart-sidebar');
    const closeSidebarButton = document.getElementById('close-sidebar');
    const cartButton = document.getElementById('cart'); // ID to open the sidebar
    const cartItemsContainer = document.getElementById('sidebar-cart-items');
    const cartTotalCost = document.getElementById('sidebar-total-cost');

    // Function to open the sidebar
    function openSidebar() {
        cartSidebar.classList.add('open'); // Show the sidebar
        populateCartSidebar();
    }

    // Function to close the sidebar
    function closeSidebar() {
        cartSidebar.classList.remove('open'); // Hide the sidebar
    }

    // Function to populate the sidebar with cart items
    function populateCartSidebar() {
        cartItemsContainer.innerHTML = '';
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
            cartTotalCost.innerHTML = '<p>Total Cost: ₹0.00</p>';
            return;
        }

        cart.forEach((item, index) => {
            const price = parseFloat(item.price);
            cartItemsContainer.innerHTML += `
                <div class="cart-item">
                    <p><strong>Product:</strong> ${item.name}</p>
                    <p><strong>Price:</strong> ₹${price.toFixed(2)}</p>
                    <p><strong>Quantity:</strong> ${item.quantity}</p>
                    <button class="remove-item" data-index="${index}">Remove</button>
                </div>
            `;
        });

        updateCartTotal();
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = parseInt(event.target.getAttribute('data-index'));
                removeFromCart(index);
            });
        });
    }

    // Function to update the total cost in the sidebar
    function updateCartTotal() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const total = cart.reduce((acc, item) => acc + (parseFloat(item.price) * item.quantity), 0);
        cartTotalCost.innerHTML = `<p>Total Cost: ₹${total.toFixed(2)}</p>`;
    }

    // Function to remove an item from the cart
    function removeFromCart(index) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (index >= 0 && index < cart.length) {
            cart.splice(index, 1); // Remove the item from the cart array
            localStorage.setItem('cart', JSON.stringify(cart)); // Update local storage
            populateCartSidebar(); // Re-populate the sidebar

            // Check if cart is empty and update icon count
            const cartCount = document.getElementById('cart-count');
            if (cartCount) {
                if (cart.length === 0) {
                    cartCount.textContent = '0';
                } else {
                    cartCount.textContent = cart.length;
                }
            }
        }
    }

    // Event listener to open the sidebar
    if (cartButton) {
        cartButton.addEventListener('click', openSidebar);
    }

    // Event listener to close the sidebar
    if (closeSidebarButton) {
        closeSidebarButton.addEventListener('click', closeSidebar);
    }
});
