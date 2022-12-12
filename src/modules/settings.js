import {removePreviousResults, } from "./display.js";

const settings = {
	// Default settings
	theme: "light",  // Supported options: light / dark
	currency: "GBP", // Supported options: GBP / EUR / USD
	displayTable: "year", // Supported options: month / year
	
	// Settings Methods
		
	swapTheme: function() {
		this.theme = this.theme === "light" ? this.theme = "dark" : "light";
		let themeButtonText = this.theme === "dark" ? "Activate Light Theme" : "Activate Dark Theme";	
		localStorage.setItem("theme", this.theme);
		return themeButtonText;
	},	
	
	activateDarkTheme: function() {
		this.theme = "dark";
		localStorage.setItem("theme", this.theme);
	},
	
	activateLightTheme: function() {
		this.theme = "light";
		localStorage.setItem("theme", this.theme);
	},
	
	
	
	swapTableDisplay: function() {
		removePreviousResults();
		this.displayTable = this.displayTable === "month" ? this.displayTable = "year" : "month";
		let displayButtonText = this.displayTable === "month" ? "View Yearly Results" : "View Monthly Results";
		localStorage.setItem("displayTable", this.displayTable);
		return displayButtonText;
	},
	
	setCurrency: function(currencyCode) {
		this.currency = currencyCode;
		localStorage.setItem("currency", this.currency);
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

function switchCurrency() {
	
	// Need to check if local storage exists for currency here 
	
	if (localStorage.getItem("currency") !== null) {settings.currency = localStorage.getItem("currency") };
	
	const currencySwitchButtons = document.querySelectorAll(".currency-switcher");

	
	currencySwitchButtons.forEach((button) => {

		if (button.getAttribute("data-currency") === settings.currency) {
			button.classList.add("active");				
		}

		button.addEventListener("click", () => {
			for (let i = 0; i < currencySwitchButtons.length; i++ ) {
				currencySwitchButtons[i].classList.remove("active");
			}
			let currency = button.getAttribute("data-currency");
			button.classList.add("active");
			settings.setCurrency(currency);			
			
			// update display with new currency by removing previous results and simulating click on the "calculate" button
			removePreviousResults();
			
			if (document.getElementById("calculate-button").className === "resulsts-exist") {
				document.getElementById("calculate-button").click();
			}

		})
	}) 
}

switchCurrency()
showSettings()


export {settings};