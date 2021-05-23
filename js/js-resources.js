var modal = document.getElementById("confirm_modal")
document.getElementById("close_modal").addEventListener("click", function () {
    modal.style.display = "none";
})
function show_confirm_dialog (segment) {
    var form = document.getElementById("form_url");
    if (segment === "equity") {
        form.setAttribute("href", "https://zerodha-common.s3.ap-south-1.amazonaws.com/Downloads-and-resources/ZerodhaTD.pdf")
    } else if (segment === "commodity") {
        form.setAttribute("href", "https://zerodha-common.s3.ap-south-1.amazonaws.com/Downloads-and-resources/ZerodhaC.pdf")
    }
    modal.style.display = "block";
    return false;
}
document.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
}
document.onkeydown = function (event) {
    if (event.keyCode === 27) {
        modal.style.display = "none";
    }
}
