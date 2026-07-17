// Function - Normalize Input - ACCEPTS 5: Total Principal Borrowed, Term Number, Term Unit (M or Y), APR, Veteran Status
function NormalizeLoanInputs({ principal, termValue, termUnit, apr, isVeteran }) {
    const principalNum = Number(principal);
    const termValueNum = Number(termValue); 
    const annualRateNum = Number(apr); 

    if (!Number.isFinite(principalNum) || principalNum <= 0) {
        throw new Error('Principal Value must be a positive number'); 
    }
    if (!Number.isFinite(termValueNum) || termValueNum <= 0) {
        throw new Error('Term must be a positive number');
    }
    if (!Number.isFinite(annualRateNum) || annualRateNum <= 0) {
        throw new Error('APR must NOT be negative'); 
    }

    const totalPayments = termUnit === 'years' ? termValueNum * 12 : termValueNum;

    let effectiveRate = annualRateNum; 

    if (isVeteran) {
        effectiveRate = Math.max(0, annualRateNum - 0.25); 
        // ADD IDENTIFIER FOR VA LOAN
    }

    // The return OBJECT KEYS will be piped into the calculations functions 
    return {
        principal: principalNum,
        totalPayments,
        annualRateNum: effectiveRate,
        originalAnnualRatePercent: annualRateNum,
        isVeteran: !!isVeteran
    };
}

modeul.exports = {
    NormalizeLoanInputs
};