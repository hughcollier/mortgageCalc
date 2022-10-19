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
			theCalculationsResults = calculateMonthlyRecords(years, interestRate, mortgageAmount, monthlyOverpayments);
			theCalculationsResultsForComparison = calculateMonthlyRecords(years, interestRate, mortgageAmount, 0);

			savings = calculateMoneyAndTimeSaved(theCalculationsResults, theCalculationsResultsForComparison);
			let normalMonthlyPayment = parseInt(theCalculationsResults[1].monthlyPayment).toLocaleString();
			let interestSaved = savings.interestSaved.toLocaleString();

			displayTextResults(normalMonthlyPayment, monthlyOverpayments, years, mortgageAmount, interestRate, savings);
			createTableHeaders();
			populateTable(theCalculationsResults);
		}
	});
}

function calculateMonthlyRecords(years, interestRate, amount, monthlyOverpayments) {

	// setup variables
	const mortgageLengthInMonths = years * 12;
	let outstandingMortgageAmount = amount;
	let totalInterestPaid = 0
	let startingBalance = 0;
	let interestOwed = 0;
	// create array to store final data
	let mortgage = []

	function createMonthObject() {
		let currentPosition = {
			month: mortgage.length + 1,
			monthlyPayment: monthlyPayment.toFixed(2),
			startingBalance: startingBalance.toFixed(2),
			interestPaid: interestOwed.toFixed(2),
			totalInterestPaidToDate: totalInterestPaid.toFixed(2),
			outstandingAmount: outstandingMortgageAmount.toFixed(2),
			monthlyOverpayments: monthlyOverpayments,
		}

		mortgage.push(currentPosition);
	}

	// Calculate monthly payment:
	const i = interestRate / 100 / 12;
	let pow = i + 1;
	pow = Math.pow(pow, -mortgageLengthInMonths);
	let monthlyPayment = (i / (1 - pow)) * outstandingMortgageAmount;

	// Build monthly position array
	for (let i = 0; i < mortgageLengthInMonths; i++) {

		startingBalance = outstandingMortgageAmount;
		let interest = (interestRate / 100) / 12;
		//calculate interest owed this month
		interestOwed = outstandingMortgageAmount * interest;
		// track total interest paid
		totalInterestPaid = totalInterestPaid + interestOwed;

		if (outstandingMortgageAmount > (monthlyPayment + monthlyOverpayments)) {
			// Normal month payment calc
			outstandingMortgageAmount = outstandingMortgageAmount - monthlyPayment + interestOwed - monthlyOverpayments;
			createMonthObject();


		} else {
			// Final payment calc
			// Is an overpayment required this month to pay off the balance? If so, calculate it
			if (outstandingMortgageAmount > monthlyPayment && outstandingMortgageAmount < (monthlyPayment + monthlyOverpayments)) {
				monthlyOverpayments = (outstandingMortgageAmount - monthlyPayment)
			} else {
				monthlyOverpayments = 0;
			}

			monthlyPayment = outstandingMortgageAmount + interestOwed;
			//deal with final payment
			outstandingMortgageAmount = outstandingMortgageAmount - monthlyPayment + interestOwed;
			createMonthObject();
			break;
		}
	}
	return mortgage;
}

function createTableHeaders() {

	const resultsContainer = document.getElementById("results-container");
	const tableHeaderRow = document.createElement("tr");
	resultsContainer.append(tableHeaderRow);

	const tableHeaderMonth = document.createElement("th");
	tableHeaderMonth.innerText = "Month";

	// const tableHeaderstartingBalance = document.createElement("th");
	// tableHeaderstartingBalance.innerText = "Starting Balance";

	const tableHeaderInterestPaid = document.createElement("th");
	tableHeaderInterestPaid.innerText = "Interest Paid";

	const tableHeaderTotalInterestPaidToDate = document.createElement("th");
	tableHeaderTotalInterestPaidToDate.innerText = "Total Interest Paid";

	const outstandingMortgageAmount = document.createElement("th");
	outstandingMortgageAmount.innerText = "Outstanding Mortgage Amount";

	tableHeaderRow.append(tableHeaderMonth);
	// tableHeaderRow.append(tableHeaderstartingBalance);
	tableHeaderRow.append(tableHeaderInterestPaid);
	tableHeaderRow.append(tableHeaderTotalInterestPaidToDate);
	tableHeaderRow.append(outstandingMortgageAmount);
}

function populateTable(theCalculationsResults) {
	const resultsContainer = document.getElementById("results-container");

	theCalculationsResults.forEach((result) => {
		const tableRow = document.createElement("tr");
		resultsContainer.append(tableRow);

		const tableDataMonth = document.createElement("td");
		tableDataMonth.innerText = result.month;
		tableRow.append(tableDataMonth);

		// const tableDataStartingBalance = document.createElement("td");
		// tableDataStartingBalance.innerText = parseInt(result.startingBalance).toLocaleString();
		// tableRow.append(tableDataStartingBalance);

		const tableDataInterestPaid = document.createElement("td");
		tableDataInterestPaid.innerText = parseInt(result.interestPaid).toLocaleString();
		tableRow.append(tableDataInterestPaid);

		const tableDataTotalInterestPaid = document.createElement("td");
		tableDataTotalInterestPaid.innerText = parseInt(result.totalInterestPaidToDate).toLocaleString();
		tableRow.append(tableDataTotalInterestPaid);

		const tableDataOutstandingMortgageAmount = document.createElement("td");
		tableDataOutstandingMortgageAmount.innerText = parseInt(result.outstandingAmount).toLocaleString();
		tableRow.append(tableDataOutstandingMortgageAmount);

	});

}

function removePreviousResults() {
	//Remove any previous error messages	
	let previousError = document.querySelectorAll("#form-validation p");
	if (previousError) {
		for (let i = 0; i < previousError.length; i++) {
			previousError[i].remove();
		}
	}

	//Remove any previous results	
	let previousResults = document.querySelectorAll("#results-container tr");
	if (previousResults) {
		for (let i = 0; i < previousResults.length; i++) {
			previousResults[i].remove();
		}
	}

	let previousTextResults = document.querySelector("#text-result p");
	if (previousTextResults) {
		previousTextResults.remove();
	}
}

function calculateMoneyAndTimeSaved(resultWithOverpayment, resultsNoOverpayment) {
	monthsSaved = parseInt(resultsNoOverpayment[resultsNoOverpayment.length - 1].month) - parseInt(resultWithOverpayment[resultWithOverpayment.length - 1].month);
	interestSaved = parseInt(resultsNoOverpayment[resultsNoOverpayment.length - 1].totalInterestPaidToDate) - parseInt(resultWithOverpayment[resultWithOverpayment.length - 1].totalInterestPaidToDate);

	let savings = {
		monthsSaved: monthsSaved,
		interestSaved: interestSaved,
	}

	return savings;
}

function displayTextResults(normalMonthlyPayment, monthlyOverpayments, years, mortgageAmount, interestRate, savings) {
	
	const monthsText = savings.monthsSaved % 12 === 1 ? "month" : "months"
	const yearsText = savings.monthsSaved < 24 ? "year" : "years"
	const timeToBeDebtFree = savings.monthsSaved > 12 ? `${Math.floor(savings.monthsSaved / 12)} ${yearsText} and ${savings.monthsSaved % 12} ${monthsText}` : `${savings.monthsSaved} ${monthsText}`
	
	const resultsToDisplay = `Your usual monthly payment is <span>£${normalMonthlyPayment}</span>. By overpaying <span>£${monthlyOverpayments}</span> a month on your mortgage with a debt of <span>${parseInt(mortgageAmount).toLocaleString()}</span> and an interest rate of <span>${interestRate}%</span>, you could save <span>£${savings.interestSaved.toLocaleString()}</span> and be debt free <span>${timeToBeDebtFree}</span> earlier.`

	const textResultContainer = document.getElementById("text-result");
	const textResult = document.createElement("p");
	textResultContainer.append(textResult);

	const resultsParagraph = document.querySelector("#text-result p");

	resultsParagraph.innerHTML = resultsToDisplay
}

getUserInput();