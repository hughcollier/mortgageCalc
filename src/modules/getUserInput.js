import { calculateMonthlyRecords, calculateMoneyAndTimeSaved, createMortgageObjectForYearDisplay} from "./calculations.js";
import {removePreviousResults, displayTextResults, createTableHeaders, populateTable} from "./display.js";
import {settings} from "./settings.js";

function getUserInput() {

// To do this the type="number" must be set in the html !! 

const formValidatoin = document.getElementById("form-validation");
const errorParagraph = document.createElement("p");
const submitBtn = document.getElementById("calculate-button");

	submitBtn.addEventListener("click", (event) => {
		event.preventDefault();
		const years = document.getElementById("mortgage-length").valueAsNumber;
		const interestRate = document.getElementById("interest-rate").valueAsNumber;
		const mortgageAmount = document.getElementById("mortgage-amount").valueAsNumber;
		const monthlyOverpayments = document.getElementById("monthly-overpayments").valueAsNumber;
		
		removePreviousResults()

		// Very basic form validation

		if (isNaN(years) || isNaN(interestRate) || isNaN(mortgageAmount) || isNaN(monthlyOverpayments)) {

			errorMessage = "Please make sure you complete all input fields. Each field must contain only a number.";


			formValidatoin.append(errorParagraph);
			errorParagraph.innerText = errorMessage;

		} else {
			let theCalculationsResults = calculateMonthlyRecords(years, interestRate, mortgageAmount, monthlyOverpayments);
			// console.log(theCalculationsResults);

			const theCalculationsResultsForComparison = calculateMonthlyRecords(years, interestRate, mortgageAmount, 0);
			const savings = calculateMoneyAndTimeSaved(theCalculationsResults, theCalculationsResultsForComparison);
			let normalMonthlyPayment = theCalculationsResults[1].monthlyPayment;
			let interestSaved = savings.interestSaved;

			if (settings.displayTable === "year") {
				theCalculationsResults = createMortgageObjectForYearDisplay(theCalculationsResults);
				// console.log(theCalculationsResults);
			}


			displayTextResults(normalMonthlyPayment, monthlyOverpayments, years, mortgageAmount, interestRate, savings);
			createTableHeaders();
			populateTable(theCalculationsResults);
		}
	});
}

export {getUserInput,};