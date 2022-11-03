function switchTheme() {

	const themeToggle = document.getElementById("switch-theme-button");
	const bodyElement = document.querySelector("body");							
	
	themeToggle.addEventListener("click", () => {
			
		if (themeToggle.innerHTML = "Activate Light Theme") {
			themeToggle.innerHTML = "Activate Dark Theme";
			console.log("test");

		} else if (themeToggle.innerHTML = "Activate Dark Theme") {
			themeToggle.innerHTML = "Activate Light Theme";

		};

		bodyElement.classList.toggle("light-theme");


	})
	

};

export {switchTheme,};