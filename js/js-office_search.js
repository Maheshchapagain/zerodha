(function() {
	if(!OFFICES) {
		return;
	}

	/*
		Structure of the office json.
		{
			"state1": {
				"city1": [{
						"name": "",
						"address": "",
						"phone": "",
						"type": ""
					}, {
						"name": "",
						"address": "",
						"phone": "",
						"type": ""
					}
				],

				"city2": [{
						"name": "",
						"address": "",
						"phone": "",
						"type": ""
					}, {
						"name": "",
						"address": "",
						"phone": "",
						"type": ""
					}
				]
			}
		}
	*/


	var states = document.querySelector("#office-location")

	// Go through each state.
	for (var state in OFFICES) {
		console.log(state)
		if (OFFICES.hasOwnProperty(state)) {
			// Create a group for each state.
            var group = document.createElement("optgroup")
            group.setAttribute("label", state)
			// Go through each city under that state.
			for(var city in OFFICES[state]) {
				if(OFFICES[state].hasOwnProperty(city)) {
                    var opt = document.createElement("option")
                    opt.value = city
                    opt.text = city
                    opt.setAttribute("data-city", city)
                    opt.setAttribute("data-state", state)
                    group.appendChild(opt)
				}
			}
			states.appendChild(group)
		}
	}

    // Selection event.
    var location = document.getElementById("office-location")
	location.onchange = function () {
        var results_container = document.getElementById("office-results")
		results_container.innerHTML = ""
		if (document.getElementsByClassName("office-more-link")[0]) {
			var element = document.getElementsByClassName("office-more-link")[0];
			element.parentNode.removeChild(element);
		}

		var opt = location.options[location.selectedIndex],
			state = opt.getAttribute("data-state"),
			city = opt.getAttribute("data-city")

		var addresses = OFFICES[state][city]

        var tpl = document.getElementsByClassName("office-result")[0].cloneNode(true)
        tpl.classList.remove("hidden")
		for(var n=0; n<addresses.length; n++) {
			var addr = addresses[n],
				html = tpl.cloneNode(true);
				html.querySelector(".name").innerHTML = (addr.name);
				html.querySelector(".address").innerHTML = (addr.address.replace(/,/ig, "<br />") + "<br />" + addr.pin);
				html.querySelector(".phone").innerHTML = (addr.phone);
				if ((addr.phone).indexOf(',') > -1) {
					var addr_arr = addr.phone.split(',');
					html.querySelector(".phone").innerHTML = ("");
					for (var i = 0; i < addr_arr.length; i++) {
						addr_arr[i]
						if (i<addr_arr.length-1) {
							html.querySelector(".phone").innerHTML += ("<a href=tel:"+addr_arr[i]+">"+addr_arr[i]+"</a>, ");
						}
						else {
							addr_arr[i] = addr_arr[i].trim();
							html.querySelector(".phone").innerHTML += ("<a href=tel:"+addr_arr[i]+">"+addr_arr[i]+"</a>");
						}
					}
				}
				else {
					html.querySelector(".phone").innerHTML = ("<a href=tel:"+addr.phone+">"+addr.phone+"</a>");
				}
				html.querySelector(".email").innerHTML = ("Get help");
				html.querySelector(".email").setAttribute("href", "https://support.zerodha.com/category/account-opening/online-account-opening/articles/how-do-i-open-an-account-online")
				html.querySelector(".dot").classList.add(addr.type)

				if (addr.type == "HQ") {
                    html.querySelector(".email").innerHTML = ("Support portal")
                    html.querySelector(".email").setAttribute("href", "https://support.zerodha.com")
					html.classList.add("office-primary")
					isPrimary = true
				} else if (addr.type == "zbranch") {
					html.classList.add("office-primary")
					isPrimary = true
				} else {
					html.classList.add("office-secondary")
					isSecondary = true
				}

				results_container.appendChild(html);
		}
		// if (isPrimary && isSecondary) {
		// 	document.getElementById("office-results").parentElement.innerHTML += "<p class='office-more-link'>View all offices &#xbb;</p>";
		// 	var secondary = document.getElementsByClassName("office-secondary");
		// 	for (var i = 0; i < secondary.length; i++) {
		// 		secondary[i].style.display = "none";
		// 	}
		// }
	    var results_height = [];
        var elements = document.querySelectorAll(".office-result");
        Array.prototype.forEach.call(elements, function (el, i) {
            results_height.push(el.clientHeight);
        });
        var results = document.getElementsByClassName("office-result")
        for (var i = 0; i < results.length; i++) {
            results[i].style.minHeight = Math.max.apply(Math, results_height) + "px";
		}
		var elmnt = document.getElementById("office-results");
		elmnt.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
		// document.addEventListener("click", function (e) {
		// 	if (e.target && e.target.className == "office-more-link") {
		// 		var secondary = document.getElementsByClassName("office-secondary");
		// 		for (var i = 0; i < secondary.length; i++) {
		// 			secondary[i].style.display = "inline-block";
		// 		}
		// 		document.getElementsByClassName("office-more-link")[0].style.display = "none";
		// 	}
		// });
	}
}())