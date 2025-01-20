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
      
      