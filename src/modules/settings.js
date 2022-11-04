
let settings = {
	// Default settings
	theme: "dark",  // Supported options: light / dark
	currency: "gbp", // Supported options: gbp / eur / usd
	displayTable: "month", // Supported options: month / year
	
	// Settings Methods
		
	swapTheme: function() {
		this.theme = this.theme === "light" ? this.theme = "dark" : "light";
		let buttonText = settings.theme === "dark" ? "Activate Light Theme" : "Activate Dark Theme";	
		localStorage.setItem("theme", this.theme);
	},
	
	
}

export {settings};