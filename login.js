// Firebase configuration (replace with your Firebase config)
var firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Function to show custom alert
function showAlert(message) {
    const alertBox = document.getElementById('custom-alert');
    const alertMessage = document.getElementById('alert-message');
    const closeButton = document.getElementById('alert-close-btn');

    // Set the message and display the alert box
    alertMessage.textContent = message;
    alertBox.classList.remove('hidden');

    // Close the alert when the close button is clicked
    closeButton.addEventListener('click', function() {
        alertBox.classList.add('hidden');
    });
}

// Login form event listener
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Get the form data
    const username = document.querySelector('input[name="username"]').value;
    const password = document.querySelector('input[name="password"]').value;

    // Reference to the Firebase Realtime Database
    const userRef = firebase.database().ref('users/' + username);

    // Get the user data from Firebase
    userRef.once('value').then((snapshot) => {
        if (snapshot.exists()) {
            const userData = snapshot.val();
            // Check if the password matches
            if (userData.password === password) {
                // Redirect to index.html if login is successful
                window.location.href = 'index.html';
            } else {
                // Show custom alert if password is incorrect
                showAlert('Incorrect username or password. Please register.');
            }
        } else {
            // Show custom alert if the username does not exist
            showAlert('User does not exist. Please register.');
        }
    }).catch((error) => {
        console.error('Error:', error);
        showAlert('An error occurred while trying to login. Please try again later.');
    });
});
