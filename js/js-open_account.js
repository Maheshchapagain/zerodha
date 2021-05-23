function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== "") {
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + "=")) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
document.getElementById("open_account_form").onsubmit = function (e) {
    e.preventDefault();
    if (document.getElementById("user_mobile").checkValidity()) {
        var url = new URL(window.location.href);
        var ref = url.searchParams.get("c");
        var src = url.searchParams.get("s");
        if (ref && document.getElementById("user_id")) {
            document.getElementById("user_id").value = ref
        }
        var mobile = document.getElementById("user_mobile").value
        var source = document.getElementById("user_source").value
        if (src) source = src
        var partner = document.getElementById("user_id").value
        if (getCookie("ref")) {
            partner = getCookie("ref")
        }
        var xhttpPost = new XMLHttpRequest();
        xhttpPost.onreadystatechange = function() {
            if (this.readyState == 4) {
                document.getElementById("open_account_proceed_form").classList.remove("disabled");
                if (this.status == 200) {
                    try {
                        let url = JSON.parse(this.response).data.redirect_url
                        window.open(url, "_self")
                    } catch (e) {
                        console.log("Error:", e)
                    }
                } else {
                    document.getElementsByClassName("help-text")[0].style.display = "none"
                    document.getElementsByClassName("error-message")[0].innerHTML = "Error " + this.status + ": " + this.statusText + ". Something went wrong. Please try again."
                    document.getElementsByClassName("error-message")[0].style.display = "block"
                }
            }
        }
        let body = {
            "mobile": mobile,
            "source": source,
            "partner_id": partner
        }
        xhttpPost.open("POST", "/account/registration.php", true);
        xhttpPost.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttpPost.send(JSON.stringify(body));
    }
}