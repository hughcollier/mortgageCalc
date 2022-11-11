import {removePreviousResults, } from "./display.js";

const settings = {
	// Default settings
	theme: "light",  // Supported options: light / dark
	currency: "gbp", // Supported options: gbp / eur / usd
	displayTable: "year", // Supported options: month / year
	
	// Settings Methods
		
	swapTheme: function() {
		this.theme = this.theme === "light" ? this.theme = "dark" : "light";
		let themeButtonText = this.theme === "dark" ? "Activate Light Theme" : "Activate Dark Theme";	
		localStorage.setItem("theme", this.theme);
		return themeButtonText;
	},	
	
	swapTableDisplay: function() {
		removePreviousResults();
		this.displayTable = this.displayTable === "month" ? this.displayTable = "year" : "month";
		let displayButtonText = this.displayTable === "month" ? "View Yearly Results" : "View Monthly Results";
		localStorage.setItem("displayTable", this.displayTable);
		return displayButtonText;
	}
	
}

function showSettings() {
	const settingsBtn = document.getElementById("settings-btn");
	const settingsScreen = document.getElementById("settings");
	
	settingsBtn.addEventListener("click", () => {
		settingsScreen.classList.toggle("active");
		settingsBtn.classList.toggle("active");
	})
}

showSettings()


export {settings};