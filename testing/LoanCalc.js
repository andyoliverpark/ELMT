// Function - Compute Monthly Payment - ACCEPTS 3: Total Principal Borrowed, APR, and Number of Months
function ComputeMonthlyPayment(principal, apr, numMonths) {
    const monthlyRate = apr / 100 / 12; // Divide by 100 to get decimal value and Divide by 12 to get monthly rate
    if (monthlyRate == 0) { // IF this is a Zero-Interest Loan
        return principal / numMonths; 
    }
    const factor = Math.pow(1 + monthlyRate, numMonths); // Split off Exponential Arithmetic into its OWN variable
    return ((principal * monthlyRate * factor) / (factor - 1)); 
}