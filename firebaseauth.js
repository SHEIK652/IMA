import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBBuDjc6nHZlHV03sCHNv5sxpX0P3IQ1QU",
    authDomain: "login-form-41be7.firebaseapp.com",
    projectId: "login-form-41be7",
    storageBucket: "login-form-41be7.appspot.com",
    messagingSenderId: "419588852782",
    appId: "1:419588852782:web:29b7b256b7401f5a5de3bf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

// Function to show custom alert
function showAlert(message) {
    const alertBox = document.getElementById('custom-alert');
    const alertMessage = document.getElementById('alert-message');
    const closeButton = document.getElementById('alert-close-btn');

    // Set the message and display the alert box
    alertMessage.textContent = message;
    alertBox.classList.remove('hidden');
    alertBox.style.opacity = 0;
    setTimeout(() => alertBox.style.opacity = 1, 100);  // Fade in effect

    // Close the alert when the close button is clicked
    closeButton.addEventListener('click', closeAlert);
}

// Function to close the custom alert
function closeAlert() {
    const alertBox = document.getElementById('custom-alert');
    alertBox.style.opacity = 0;  // Fade out effect
    setTimeout(() => {
        alertBox.classList.add('hidden');
    }, 300);
}

// Event listener for login form submission
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.querySelector('[name="username"]').value;
    const password = document.querySelector('[name="password"]').value;

    // Firebase sign in with email and password
    signInWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
            // Signed in successfully
            const user = userCredential.user;
            showAlert("Login successful!");
            // Redirect to a different page or handle the login here
            window.location.href = 'index.html'; // Example redirect
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            showAlert("Invalid username or password. Please try again.");
        });
});
