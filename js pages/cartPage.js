import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCfytV7PtN2LIrv8jBlqsLRGQeGtVe4LqY",
    authDomain: "golden-f43ab.firebaseapp.com",
    projectId: "golden-f43ab",
    storageBucket: "golden-f43ab.app",
    messagingSenderId: "314092349099",
    appId: "1:314092349099:web:9449b624f50ac93c5d39ee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const userId = "4QHhn42NtsNkAE3DQrX0VCZpVH52"; // Replace with actual user ID
const cartItemsContainer = document.getElementById("cartItemsContainer");
const subtotalElement = document.getElementById("subtotal");
const taxElement = document.getElementById("tax");
const totalElement = document.getElementById("total");

let subtotal = 0;

async function fetchCartItems() {
    const cartRef = collection(db, "cart");
    const q = query(cartRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        const item = doc.data();
        const { name, price, description, image, quantity } = item;

        // Add item to cart
        const cartItemHTML = `
            <div class="list-group-item d-flex justify-content-between align-items-center cart-item">
                <img src="${image}" alt="${name}" class="img-thumbnail" style="width: 100px; height: 100px; object-fit: cover;">
                <div class="ms-3">
                    <h5 class="card-title">${name}</h5>
                    <p class="card-text">${description}</p>
                    <p class="card-text">Price: ${price} JD</p>
                </div>
                <div class="d-flex align-items-center">
                    <button class="btn btn-outline-secondary mx-2 decrease-btn"><i class="bi bi-dash"></i></button>
                    <input type="number" value="${quantity}" class="form-control mx-3 quantity-input" style="width: 60px;" min="1">
                    <button class="btn btn-outline-secondary mx-2 increase-btn"><i class="bi bi-plus"></i></button>
                </div>
            </div>
        `;
        cartItemsContainer.innerHTML += cartItemHTML;

        // Update subtotal
        subtotal += price * quantity;
    });

    // Update summary
    const tax = subtotal * 0.15; // Example: 15% tax
    const total = subtotal + tax;

    subtotalElement.textContent = `${subtotal.toFixed(2)} JD`;
    taxElement.textContent = `${tax.toFixed(2)} JD`;
    totalElement.textContent = `${total.toFixed(2)} JD`;
}

// Fetch and display cart items on page load
fetchCartItems();