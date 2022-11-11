import { calculateMonthlyRecords, calculateMoneyAndTimeSaved, createMortgageObjectForYearDisplay} from "./calculations.js";
import {removePreviousResults, displayTextResults, createTableHeaders, populateTable} from "./display.js";
import {settings} from "./settings.js";


function getUserInput() {

	const submitBtn = document.getElementById("calculate-button");

	submitBtn.addEventListener("click", (event) => {
		event.preventDefault();

		// To do this the type="number" must be set in the html !! 
		let years = document.getElementById("mortgage-length").valueAsNumber;
		let interestRate = document.getElementById("interest-rate").valueAsNumber;
		let mortgageAmount = document.getElementById("mortgage-amount").valueAsNumber;
		let monthlyOverpayments = document.getElementById("monthly-overpayments").valueAsNumber;

		removePreviousResults()

		// Very basic form validation

		if (isNaN(years) || isNaN(interestRate) || isNaN(mortgageAmount) || isNaN(monthlyOverpayments)) {

			errorMessage = "Please make sure you complete all input fields. Each field must contain only a number.";

			const formValidatoin = document.getElementById("form-validation");
			const errorParagraph = document.createElement("p");
			formValidatoin.append(errorParagraph);
			errorParagraph.innerText = errorMessage;

		} else {
			let theCalculationsResults = calculateMonthlyRecords(years, interestRate, mortgageAmount, monthlyOverpayments);
			console.log(theCalculationsResults);

			const theCalculationsResultsForComparison = calculateMonthlyRecords(years, interestRate, mortgageAmount, 0);
			const savings = calculateMoneyAndTimeSaved(theCalculationsResults, theCalculationsResultsForComparison);
			let normalMonthlyPayment = parseInt(theCalculationsResults[1].monthlyPayment).toLocaleString();
			let interestSaved = savings.interestSaved.toLocaleString();

			if (settings.displayTable === "year") {
				theCalculationsResults = createMortgageObjectForYearDisplay(theCalculationsResults);
				console.log(theCalculationsResults);
			}


			displayTextResults(normalMonthlyPayment, monthlyOverpayments, years, mortgageAmount, interestRate, savings);
			createTableHeaders();
			populateTable(theCalculationsResults);
		}
	});
}

export {getUserInput,};