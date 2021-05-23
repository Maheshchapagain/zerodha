function toggleMenu () {
	document.getElementById("menu").classList.toggle("show");
	document.getElementById("nav-icon3").classList.toggle("open");
}

(function () {
	const links = document.getElementsByClassName("nav-links")
	const currentUrl = location.href
	for (const link of links) {
		if (currentUrl.indexOf(link.pathname) !== -1) {
			link.classList.add("active")
		}
		if (currentUrl.indexOf("charges") !== -1 && link.pathname.indexOf("pricing") !== -1) {
			link.classList.add("active")
		}
		if (currentUrl.indexOf("investments") !== -1 && link.pathname.indexOf("products") !== -1) {
			link.classList.add("active")
		}
	}
	// Close the dropdown if the user clicks outside of it
	window.onclick = function (event) {
		var dropdown = document.getElementById("menu");
		if (event && !event.target.matches("#menu_btn") && !event.target.matches("#nav-ion3") && !document.querySelector("#nav-icon3").contains(event.target) && !document.querySelector("#menu").contains(event.target) && !event.target.matches(".menu-icon")) {
			if (dropdown.classList.contains("show")) {
				dropdown.classList.remove("show");
				document.getElementsByTagName("body")[0].style.overflow = "auto";
			}
		} else {
			if (!dropdown.classList.contains("show")) {
				document.getElementsByTagName("body")[0].style.overflow = "auto";
			} else {
				if (window.innerWidth < 840) {
					document.getElementsByTagName("body")[0].style.overflow = "hidden";
				}
			}
		}
	}
}())

