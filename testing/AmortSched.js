// Function - Build Amortization Schedule - ACCEPTS 3: Total Principal Borrowed, APR, and Number of Months
function BuildAmortSchedule(principal, apr, numMonths) {
    const monthlyPayment; 
    const monthlyRate = apr / 100 / 12; 
    if (monthlyRate == 0) {
        monthlyPayment = principal / numMonths; 
    } else {
        const factor = Math.pow(1 + monthlyRate, numMonths); 
        monthlyPayment = (principal * monthlyRate * factor) / (factor - 1); 
    }

    let balance = principal; 
    let totalInterestPaid = 0; 

    const rows = []; 

    for (let period = 1; period <= totalPayments; period++) {
        const interest = balance * monthlyRate; 
        const principalPaid = monthlyPayment - interest; 
        balance = balance - principalPaid; 
        totalInterestPaid += interest;

        rows.push({
            period,
            payment: monthlyPayment,
            principalPaid,
            interestPaid: interest,
            totalInterestPaid,
            balance: balance < 0 ? 0 : balance
        });
    }

    return { monthlyPayment, rows, totalInterestPaid }; 
}