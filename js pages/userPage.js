import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

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
const auth = getAuth();
const db = getFirestore(app);

// References to DOM elements
const userName = document.getElementById('userName');
const userEmail = document.getElementById('userEmail');
const userAge = document.getElementById('userAge');
const userCategories = document.getElementById('userCategories');
const editButton = document.getElementById('editButton');
const editProfile = document.getElementById('editProfile');
const logoutButton = document.getElementById('logoutButton');
const editForm = document.getElementById('editForm');

// Listen for user authentication state
onAuthStateChanged(auth, async (user) => {
  if (user) {
    // User is signed in, fetch user profile from Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      userName.textContent = `Name: ${userData.firstName} ${userData.lastName}`;
      userEmail.textContent = `Email: ${userData.email}`;
      userAge.textContent = `Age: ${userData.age}`;
      userCategories.textContent = `Gift Categories: ${userData.categories}`;
    }
  } else {
    // Redirect to login page if not authenticated
    window.location.href = "../htmlPages/login.html";
  }
});

// Edit Profile Button - Show edit form
editButton.addEventListener('click', () => {
  editProfile.style.display = 'block';
  const currentName = userName.textContent.split(': ')[1].split(' ');
  document.getElementById('editFirstName').value = currentName[0];
  document.getElementById('editLastName').value = currentName[1];
  document.getElementById('editEmail').value = userEmail.textContent.split(': ')[1];
  document.getElementById('editAge').value = userAge.textContent.split(': ')[1];
  document.getElementById('editCategories').value = userCategories.textContent.split(': ')[1];

  // Make the email field read-only
  document.getElementById('editEmail').disabled = true; // Disable email field to prevent modification
});

// Handle the update profile form submission
editForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const firstName = document.getElementById('editFirstName').value;
  const lastName = document.getElementById('editLastName').value;
  const age = document.getElementById('editAge').value;
  const categories = document.getElementById('editCategories').value;

  const user = auth.currentUser;

  if (user) {
    try {
      // Update user profile data in Firestore using merge: true to only update the changed fields
      await setDoc(doc(db, 'users', user.uid), {
        firstName,
        lastName,
        age,
        categories
      }, { merge: true }); // Using merge to preserve the existing fields

      alert('Profile updated successfully!');
      window.location.reload(); // Reload the page to show updated data
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile.');
    }
  }
});

// Log out user
logoutButton.addEventListener('click', () => {
  signOut(auth).then(() => {
    window.location.href = '../index.html'; // Redirect to login page after logout
  }).catch((error) => {
    console.error('Error signing out:', error);
  });
});


/*======================update image=====================*/

document.addEventListener("DOMContentLoaded", () => {
  const profileImage = document.getElementById("profileImage");
  const editImageIcon = document.getElementById("editImageIcon");
  const imageUpload = document.getElementById("imageUpload");

  // Check if elements exist before attaching event listeners
  if (editImageIcon && imageUpload && profileImage) {
    // Open the file picker when the edit icon is clicked
    editImageIcon.addEventListener("click", () => {
      imageUpload.click();
    });

    // Replace the profile image with the selected file
    imageUpload.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          profileImage.src = e.target.result; // Update the profile image source
        };
        reader.readAsDataURL(file); // Read the image file as a data URL
      }
    });
  } else {
    console.error("One or more elements are missing. Check your HTML structure.");
  }
});

