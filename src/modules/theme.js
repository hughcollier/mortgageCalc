function switchTheme() {
	const bodyElement = document.querySelector("body");	
	const themeToggle = document.getElementById("switch-theme-button");

	const defaultTheme = "light";
	let currentTheme

	if (localStorage.getItem("theme") === null) {
		// Nothing in local storage so use default theme
		currentTheme = defaultTheme;

	} else {
		// Theme is being set by value in local storage
		currentTheme = localStorage.getItem("theme");
	};
	
	if (currentTheme === "light") {
		bodyElement.classList.add("light-theme");
	};
							
	themeToggle.innerHTML = currentTheme === "dark" ? "Activate Light Theme" : "Activate Dark Theme";	

	themeToggle.addEventListener("click", () => {
	
		if (currentTheme === "dark") {
			themeToggle.innerHTML = "Activate Dark Theme";
			currentTheme = "light";
			
		} else if (currentTheme = "light") {
			themeToggle.innerHTML = "Activate Light Theme";
			currentTheme = "dark";
		};

		bodyElement.classList.toggle("light-theme");
		localStorage.setItem("theme", currentTheme);

		console.log(currentTheme);
	
	})
	
};

export {switchTheme,};