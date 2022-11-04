import {settings} from "./settings.js";

function switchTheme() {
	const bodyElement = document.querySelector("body");	
	const themeToggle = document.getElementById("switch-theme-button");

	if (localStorage.getItem("theme") !== null) { settings.theme = window.localStorage.getItem('theme'); };
	if (settings.theme === "light") { bodyElement.classList.add("light-theme"); };							
	let buttonText = settings.theme === "dark" ? "Activate Light Theme" : "Activate Dark Theme";	
	themeToggle.innerHTML = buttonText;

	themeToggle.addEventListener("click", () => {
			buttonText = settings.swapTheme();
			themeToggle.innerHTML = buttonText;
			bodyElement.classList.toggle("light-theme");
	})
};

export {switchTheme,};