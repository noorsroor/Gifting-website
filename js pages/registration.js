
// Import the functions you need from Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Your Firebase configuration
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
const auth = getAuth(app);
const db = getFirestore(app);

// Reference the registration form
const registrationForm = document.querySelector("form");

// Listen for the registration form submission
registrationForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get input field values
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const age = document.getElementById("age").value;
    const categories = document.getElementById("categories").value;

    // Validate inputs
    if (!firstName || !lastName || !email || !password || !age || !categories) {
        alert("Please fill in all the fields.");
        return;
    }

    try {
        // Create a new user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save additional user data in Firestore
        await setDoc(doc(db, "users", user.uid), {
            firstName: firstName,
            lastName: lastName,
            email: email,
            age: age,
            categories: categories
        });

        // Display success message
        alert(`Welcome, ${firstName}! Your account has been created successfully.`);

        // Redirect to homepage after registration
        window.location.href = "../htmlPages/login.html"; // Change to your homepage URL

    } catch (error) {
        // Handle registration errors
        console.error("Error during registration:", error);
        if (error.code === "auth/email-already-in-use") {
            alert("This email address is already in use. Please use a different email.");
        } else {
            alert(`Error: ${error.message}`);
        }
    }
});






