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

function calculateMoneyAndTimeSaved(resultWithOverpayment, resultsNoOverpayment) {
	const monthsSaved = parseInt(resultsNoOverpayment[resultsNoOverpayment.length - 1].month) - parseInt(resultWithOverpayment[resultWithOverpayment.length - 1].month);
	const interestSaved = parseInt(resultsNoOverpayment[resultsNoOverpayment.length - 1].totalInterestPaidToDate) - parseInt(resultWithOverpayment[resultWithOverpayment.length - 1].totalInterestPaidToDate);

	let savings = {
		monthsSaved: monthsSaved,
		interestSaved: interestSaved,
	}

	return savings;
}

export { 
	calculateMonthlyRecords, 
	calculateMoneyAndTimeSaved,
};
