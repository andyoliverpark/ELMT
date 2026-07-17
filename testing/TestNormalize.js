const { NormalizeLoanInputs } = require('../server/util/MathLoan.cjs'); 

const raw = {
    principal: '50000',
    termValue: '30',
    termUnit: 'years',
    apr: '5.0',
    isVeteran: true
};

const finished = NormalizeLoanInputs(raw);

console.log(finished);