import {settings} from "./settings.js";

function switchTheme() {
	const bodyElement = document.querySelector("body");	
	const darkThemeButton = document.getElementById("activate-dark-theme");
	const lightThemeButton = document.getElementById("activate-light-theme");

	if (localStorage.getItem("theme") !== null) { settings.theme = window.localStorage.getItem('theme'); };
	
	if (settings.theme === "light") { 
		bodyElement.classList.add("light-theme"); 
		lightThemeButton.classList.add("active");
	};							
	
	if (settings.theme === "dark") {
		darkThemeButton.classList.add("active");
	};
		
	lightThemeButton.addEventListener("click", () => {
		settings.activateLightTheme();
		
		bodyElement.classList.add("light-theme");
		lightThemeButton.classList.add("active");
		
		bodyElement.classList.remove("dark-theme",);
		darkThemeButton.classList.remove("active");
		
	});
	
	darkThemeButton.addEventListener("click", () => {
		settings.activateDarkTheme();
		
		bodyElement.classList.add("dark-theme");
		darkThemeButton.classList.add("active");
		
		bodyElement.classList.remove("light-theme",);
		lightThemeButton.classList.remove("active");
		
	});
	
	
	
};

export {switchTheme,};