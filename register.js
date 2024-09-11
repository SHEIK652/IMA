import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

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

// Show custom alert
function showAlert(message, isError = true) {
    const alertContainer = document.getElementById('custom-alert');
    const alertMessage = document.getElementById('alert-message');
    const closeButton = document.getElementById('alert-close-btn');

    // Set the alert message and display the container
    alertMessage.textContent = message;
    alertContainer.classList.remove('hidden');

    // Close the alert when the close button is clicked
    closeButton.addEventListener('click', function() {
        alertContainer.classList.add('hidden');
    });

    // Optionally change styling based on error or success
    if (isError) {
        alertMessage.style.color = '#ff5f5f'; // Red color for errors
    } else {
        alertMessage.style.color = '#4caf50'; // Green color for success
    }
}

// Submit event listener
const submit = document.getElementById('submit');
submit.addEventListener("click", function(event) {
    event.preventDefault();
    
    // Get inputs
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirm_password = document.getElementById('confirm_password').value;

    // Password confirmation check
    if (password !== confirm_password) {
        showAlert("Passwords do not match!", true);
        return;
    }

    // Create user with email and password
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up successfully
        const user = userCredential.user;
        showAlert("Account created successfully!", false);
        // Additional actions like storing username can go here
      })
      .catch((error) => {
        const errorMessage = error.message;
        showAlert(errorMessage, true);
      });
});
