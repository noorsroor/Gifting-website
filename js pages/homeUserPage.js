const projectDivs = document.querySelectorAll('.projects > div');

// Loop through each div and add a click event listener
projectDivs.forEach((div) => {
  div.addEventListener('click', () => {
    window.location.href = '../htmlPages/shopPage.html'; 
  });
});


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


document.addEventListener("click", function (event) {
  // Check if the clicked element is an "add-to-cart" button
  if (event.target.closest(".add-to-cart")) {
      const button = event.target.closest(".add-to-cart");
      // Get the "add-box" within the clicked button
      const addBox = button.querySelector(".add-box");
      if (!addBox) return; // Exit if addBox is not found
  
      const loader = addBox.querySelector(".loader");
      const addText = addBox.querySelector("a");
      const doneIcon = addBox.querySelector(".done");
  
      // Check if all required elements exist inside the clicked button
      if (!loader || !addText || !doneIcon) {
      console.error("Missing required elements inside the button structure.");
      return;
      }
  
      // Hide the "Add to Cart" text
      addText.style.visibility = "hidden";
  
      // Start the loader animation
      loader.classList.add("active");
  
      setTimeout(() => {
      // Transition to the check icon
      loader.classList.remove("active");
      loader.classList.add("check");
      doneIcon.classList.add("check");
  
      setTimeout(() => {
          console.log("Added to cart for this button!");
      }, 500);
      }, 1000);
  }
  });

