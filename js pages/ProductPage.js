let save =document.querySelector("#addToCartBTN");
let loader =document.querySelector(".loader");
let savetxt =document.querySelector(".save-box a");
let done =document.querySelector(".save-box .done");

save.onclick =function () {
    
    savetxt.style.visibility= "hidden";
    loader.classList.toggle('active');
    console.log("saveeeeeeeeeeeeeeeee")
    setTimeout (function fun1() {
    loader.classList.toggle('check');
    done.classList.toggle('check');
    setTimeout (function () {
    window.location.href="./cartPage.html";} ,500);
    }, 1500);
}