// Function - Normalize Input - ACCEPTS 5: Total Principal Borrowed, Term Number, Term Unit (M or Y), APR, Veteran Status
function NormalizeLoanInputs({ principal, termValue, termUnit, apr, isVeteran }) {
    const principalNum = Number(principal);
    const termValueNum = Number(termValue); 
    const aprNum = Number(apr); 

    if (!Number.isFinite(principalNum) || principalNum <= 0) {
        throw new Error('Principal Value must be a positive number'); 
    }
    if (!Number.isFinite(termValueNum) || termValueNum <= 0) {
        throw new Error('Term must be a positive number');
    }
    if (!Number.isFinite(aprNum) || aprNum <= 0) {
        throw new Error('APR must NOT be negative'); 
    }

    const numMonths = termUnit === 'years' ? termValueNum * 12 : termValueNum;

    let effectiveRate = aprNum; 

    if (isVeteran) {
        effectiveRate = Math.max(0, aprNum - 0.25); 
        // ADD IDENTIFIER FOR VA LOAN
    }

    // The return OBJECT KEYS will be piped into the calculations functions 
    return {
        principal: principalNum,
        numMonths,
        aprNum: effectiveRate,
        originalAnnualRatePercent: aprNum,
        isVeteran: !!isVeteran
    };
}

module.exports = { NormalizeLoanInputs }; 