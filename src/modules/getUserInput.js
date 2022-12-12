import { calculateMonthlyRecords, calculateMoneyAndTimeSaved, createMortgageObjectForYearDisplay} from "./calculations.js";
import {errorArrayFormatting, removePreviousResults, displayTextResults, createTableHeaders, populateTable} from "./display.js";
import {settings} from "./settings.js";

function getUserInput() {

const formValidatoin = document.getElementById("form-validation");
const errorParagraph = document.createElement("p");
const submitBtn = document.getElementById("calculate-button");

let years;
let interestRate;
let mortgageAmount;
let monthlyOverpayments;

	submitBtn.addEventListener("click", (event) => {
		event.preventDefault();
		submitBtn.classList.add("resulsts-exist")
		
		// To do this the type="number" must be set in the html !! 
		years = document.getElementById("mortgage-length").valueAsNumber;
		interestRate = document.getElementById("interest-rate").valueAsNumber;
		mortgageAmount = document.getElementById("mortgage-amount").valueAsNumber;
		monthlyOverpayments = document.getElementById("monthly-overpayments").valueAsNumber;
		
		removePreviousResults()

		// Very basic form validation
		
		let errorMessage = [];
		const lengthError = document.getElementById("mortgage-length");	
		const interestRateError = document.getElementById("interest-rate");
		const mortgageAmountError = document.getElementById("mortgage-amount");
		const monthlyOverpaymentsError = document.getElementById("monthly-overpayments");
		
		
		if (years < 5 || years > 35 || isNaN(years) || years === "") {
			errorMessage.push("length of mortgage must be between 5 and 35 years");
			lengthError.classList.add("form-error", "animate__headShake");
		}
		
		if (interestRate < 0.1 || interestRate > 100 || isNaN(interestRate) || interestRate === "" ) {
			errorMessage.push("interest rate must be between 0.1% and 100%");
			interestRateError.classList.add("form-error", "animate__headShake");
		}
		
		if (mortgageAmount < 10000 || isNaN(mortgageAmount) || mortgageAmount === "" ) {
			errorMessage.push("mortgage amount must be 10,000 or more");
			mortgageAmountError.classList.add("form-error", "animate__headShake");
		}
		
		if (monthlyOverpayments < 0 || isNaN(monthlyOverpayments) || monthlyOverpayments === "") {
			errorMessage.push("negative overpayments are not allowed");
			monthlyOverpaymentsError.classList.add("form-error", "animate__headShake");
		}
		
		if (monthlyOverpayments > (mortgageAmount / 100 * 10)) {
			errorMessage.push("overpayments cannot be more than 10% of mortage amount");
			monthlyOverpaymentsError.classList.add("form-error", "animate__headShake");
		}
		
		if (errorMessage.length > 0)  {
			errorMessage[0] = errorMessage[0].charAt(0).toUpperCase() + errorMessage[0].slice(1);
			const errorTitle = document.createElement("h2");
			const errorTitleText = errorMessage.length === 1 ? "There is a probem with your form input:" : "There are some problems with your form input:";
			formValidatoin.append(errorTitle);
			errorTitle.innerText = errorTitleText;

			errorMessage = errorArrayFormatting(errorMessage);
			formValidatoin.append(errorParagraph);
			errorParagraph.innerText = errorMessage;
		
		} else {
			let theCalculationsResults = calculateMonthlyRecords(years, interestRate, mortgageAmount, monthlyOverpayments);

			const theCalculationsResultsForComparison = calculateMonthlyRecords(years, interestRate, mortgageAmount, 0);
			const savings = calculateMoneyAndTimeSaved(theCalculationsResults, theCalculationsResultsForComparison);
			let normalMonthlyPayment = theCalculationsResults[1].monthlyPayment;
			let interestSaved = savings.interestSaved;

			if (settings.displayTable === "year") {
				theCalculationsResults = createMortgageObjectForYearDisplay(theCalculationsResults);
			}

			displayTextResults(normalMonthlyPayment, monthlyOverpayments, years, mortgageAmount, interestRate, savings);
			createTableHeaders();
			populateTable(theCalculationsResults);
		}
	});
}

export {getUserInput,};