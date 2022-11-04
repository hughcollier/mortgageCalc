let settings = {
	// Default settings
	theme: "light",  // Supported options: light / dark
	currency: "gbp", // Supported options: gbp / eur / usd
	displayTable: "month", // Supported options: month / year
	
	// Settings Methods
		
	swapTheme: function() {
		this.theme = this.theme === "light" ? this.theme = "dark" : "light";
		let buttonText = settings.theme === "dark" ? "Activate Light Theme" : "Activate Dark Theme";	
		localStorage.setItem("theme", this.theme);
		return buttonText;
	},	
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