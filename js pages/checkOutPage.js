// Import Firebase modules
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";

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

// Function to fetch products from Firestore
async function fetchProducts() {
  const querySnapshot = await getDocs(collection(db, "products"));
  const productList = document.getElementById("product-list");
  let total = 0;
  
  querySnapshot.forEach((doc) => {
    const product = doc.data();
    const li = document.createElement("li");
    li.classList.add("product-item");

    li.innerHTML = `
      <div class="product-info">
        <h5>${product.name}</h5>
        <p>${product.description}</p>
        <span class="price">$${product.price.toFixed(2)}</span>
      </div>
    `;
    
    productList.appendChild(li);
    total += product.price;
  });

  // Display total price
  document.getElementById("subtotal").textContent = `$${total.toFixed(2)}`;
  document.getElementById("total").textContent = `$${total.toFixed(2)}`;
}

// Call fetchProducts function when page loads
window.onload = () => {
  fetchProducts();
};
