const sliderWrapper = document.querySelector(".slider-wrapper");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentIndex = 0;

function updateSlider() {
  const translateX = -currentIndex * 100; // Slide width is 100% of the wrapper
  sliderWrapper.style.transform = `translateX(${translateX}%)`;
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });
}

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + dots.length) % dots.length;
  updateSlider();
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % dots.length;
  updateSlider();
});

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentIndex = index;
    updateSlider();
  });
});




let toSignUp = document.getElementById("signup-btn");

toSignUp.addEventListener("click", ()=>{
    window.location.href="../htmlPages/registration.html";
});



// Get modal elements
const modal = document.getElementById('signupModal');
const closeModal = document.getElementById('closeModal');
const goToSignupBtn = document.getElementById('goToSignupBtn');

// Function to show the modal
function popUp() {
  modal.style.display = 'block';

  // Close the modal when the "X" button is clicked
  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Redirect to signup page when "Go to Sign Up" button is clicked
  goToSignupBtn.addEventListener('click', () => {
    window.location.href = '../htmlPages/registration.html'; // Replace with your signup page URL
  });

  // Close the modal if the user clicks outside the modal content
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
}

// Select all "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart');

// Add click event listener to each button
addToCartButtons.forEach((button) => {
  button.addEventListener('click', () => {
    popUp();
  });
});