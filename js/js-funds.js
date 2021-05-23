document.addEventListener("DOMContentLoaded", function () { 
    tinytabs(document.querySelector("#funds_tabs"));
})
let elements = document.querySelectorAll(".tooltip, .mobile-alternate-funds")
for (var i = 0; i < elements.length; i++) {
    console.log(elements[i])
    elements[i].onclick = function () {
        document.getElementsByClassName("alternate-funds")[0].style.display = "block";
        document.getElementsByClassName("alternate-funds")[0].scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
    }
}
