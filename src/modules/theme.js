import {settings} from "./settings.js";

function switchTheme() {
	const bodyElement = document.querySelector("body");	
	const themeToggle = document.getElementById("switch-theme-button");

	if (localStorage.getItem("theme") !== null) { settings.theme = window.localStorage.getItem('theme'); };
	if (settings.theme === "light") { bodyElement.classList.add("light-theme"); };							
	
	
	let themeButtonText = settings.theme === "dark" ? "Activate Light Theme" : "Activate Dark Theme";	
	themeToggle.innerHTML = themeButtonText;

	themeToggle.addEventListener("click", () => {
			themeButtonText = settings.swapTheme();
			themeToggle.innerHTML = themeButtonText;
			bodyElement.classList.toggle("light-theme");
	})
};

export {switchTheme,};