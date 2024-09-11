

// Handle video hover effect
document.querySelectorAll('.video-container').forEach(container => {
    container.addEventListener('mouseover', () => {
        const video = container.querySelector('video');
        if (video) video.play();
    });
    container.addEventListener('mouseleave', () => {
        const video = container.querySelector('video');
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
    });
});

// Handle mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.querySelector('.menu-icon');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (menuIcon && dropdownMenu) {
        menuIcon.addEventListener('click', () => {
            dropdownMenu.classList.toggle('show');
        });
    }
});


let nextButton = document.getElementById('next');
let prevButton = document.getElementById('prev');
let carousel = document.querySelector('.carousel');
let listHTML = document.querySelector('.carousel .list');
let seeMoreButtons = document.querySelectorAll('.seeMore');
let backButton = document.getElementById('back');

const handleButtonClick = (type) => {
    // Disable buttons during animation
    nextButton.style.pointerEvents = 'none';
    prevButton.style.pointerEvents = 'none';

    carousel.classList.remove('next', 'prev');

    let items = document.querySelectorAll('.carousel .list .item');

    if (type === 'next') {
        listHTML.appendChild(items[0]);
        carousel.classList.add('next');
    } else {
        listHTML.prepend(items[items.length - 1]);
        carousel.classList.add('prev');
    }

    // Re-enable buttons after animation
    setTimeout(() => {
        nextButton.style.pointerEvents = 'auto';
        prevButton.style.pointerEvents = 'auto';
    }, 2000);
};

nextButton.onclick = () => handleButtonClick('next');
prevButton.onclick = () => handleButtonClick('prev');

seeMoreButtons.forEach(button => {
    button.onclick = () => {
        carousel.classList.remove('next', 'prev');
        carousel.classList.add('showDetail');
    };
});

backButton.onclick = () => {
    carousel.classList.remove('showDetail');
};

document.addEventListener('DOMContentLoaded', () => {
    const videoContainers = document.querySelectorAll('.video-container');

    videoContainers.forEach(container => {
        const link = container.querySelector('.thumbnail-link');
        const video = container.querySelector('video');
        const image = container.querySelector('img');

        // Handle video play/pause
        container.addEventListener('click', (event) => {
            if (event.target === image) {
                // Toggle video play/pause
                if (video.style.display === 'block') {
                    video.pause();
                    video.style.display = 'none';
                } else {
                    // Hide other videos
                    videoContainers.forEach(otherContainer => {
                        if (otherContainer !== container) {
                            const otherVideo = otherContainer.querySelector('video');
                            otherVideo.pause();
                            otherVideo.style.display = 'none';
                        }
                    });
                    video.style.display = 'block';
                    video.play();
                }
            }
        });

        // Allow links to work if video is not displayed
        link.addEventListener('click', (event) => {
            if (video.style.display === 'block') {
                event.preventDefault(); // Prevent default if video is playing
                video.pause();
                video.style.display = 'none'; // Hide the video
            }
        });

        video.addEventListener('ended', () => {
            video.style.display = 'none'; // Hide video when it ends
        });
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
