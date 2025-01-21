// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCfytV7PtN2LIrv8jBlqsLRGQeGtVe4LqY",
    authDomain: "golden-f43ab.firebaseapp.com",
    projectId: "golden-f43ab",
    storageBucket: "golden-f43ab.firebasestorage.app",
    messagingSenderId: "314092349099",
    appId: "1:314092349099:web:9449b624f50ac93c5d39ee",
    measurementId: "G-PYNZ6QXR40"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Handle form submission
document.getElementById('contact-form').addEventListener('submit', async function (event) {
    event.preventDefault();  // Prevent form from submitting normally

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Add data to Firestore
    try {
        const docRef = await addDoc(collection(db, "contactMessages"), {
            name: name,
            email: email,
            message: message,
            timestamp: new Date().toISOString()
        });
        // Replace alert with SweetAlert2
        Swal.fire({
            title: 'Success!',
            text: 'Your message has been sent successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
        });

        // Optionally clear the form
        document.getElementById('contact-form').reset();
    } catch (e) {
        console.error("Error adding document: ", e);
        Swal.fire({
            title: 'Error!',
            text: 'There was an error submitting your message. Please try again.',
            icon: 'error',
            confirmButtonText: 'Try Again'
        });
    }
});