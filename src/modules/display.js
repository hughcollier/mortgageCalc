function createTableHeaders() {

	const resultsContainer = document.getElementById("results-container");
	const tableHeaderRow = document.createElement("tr");
	resultsContainer.append(tableHeaderRow);

	const tableHeaderMonth = document.createElement("th");
	tableHeaderMonth.innerText = "Month";

	const tableHeaderInterestPaid = document.createElement("th");
	tableHeaderInterestPaid.innerText = "Interest Paid";

	const tableHeaderTotalInterestPaidToDate = document.createElement("th");
	tableHeaderTotalInterestPaidToDate.innerText = "Total Interest Paid";

	const outstandingMortgageAmount = document.createElement("th");
	outstandingMortgageAmount.innerText = "Outstanding Mortgage Amount";

	tableHeaderRow.append(tableHeaderMonth);
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



export {
	createTableHeaders, populateTable, displayTextResults, removePreviousResults,
};