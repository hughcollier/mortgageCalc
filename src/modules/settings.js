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
	
	const currencySwitchButtons = document.querySelectorAll(".currency-switcher");
	
	// Need to check if local storage exists for currency here 
	
	currencySwitchButtons.forEach((button) => {

		console.log(typeof button.getAttribute("data-currency") + " " + button.getAttribute("data-currency") )
		console.log(typeof settings.currency + " " + settings.currency )


		if (button.getAttribute("data-currency") === settings.currency) {
			button.classList.add("active-currency");			
			
		}

		button.addEventListener("click", () => {
			for (let i = 0; i < currencySwitchButtons.length; i++ ) {
				currencySwitchButtons[i].classList.remove("active-currency");
			}
			let currency = button.getAttribute("data-currency");
			button.classList.add("active-currency");
			settings.currency = currency;
			
			// need to add / update local storage here 
			
			// update display with new currency by removing previous results and simulating click on the "calculate" button
			removePreviousResults();
			document.getElementById("calculate-button").click();

		})
	}) 
	
	
	console.log(currencySwitchButtons);
}



switchCurrency()
showSettings()


export {settings};