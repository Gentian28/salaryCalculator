class TAP {
    constructor(min, max) {
        this.min = min;
        this.max = max;
    }
}

const tap = new TAP(30000, 150000); // TAP, Tatimi mbi te ardhurat personale

const employeeSocialContributionPercentage = 9.5 / 100;
const employeeHealthContributionPercentage = 1.7 / 100;

const tapMinTaxPercentage = 13 / 100;
const tapMaxTaxPercentage = 23 / 100;
const minSalary = 26000;
const maxSalary = 114670;
let grossSalary;
let netoSalary;
let employeeSocialContribution;
let employeeHealthContribution;
let salaryTax;

calculate.onclick = function () {
    // get Salary value
    grossSalary = SalaryValue.value;

    // calculate employee social contribution
    if (grossSalary >= maxSalary) {
        employeeSocialContribution = maxSalary * employeeSocialContributionPercentage;
    } else {
        employeeSocialContribution = grossSalary * employeeSocialContributionPercentage;
    }

    // calculate employee health contribution
    employeeHealthContribution = grossSalary * employeeHealthContributionPercentage;

    if (grossSalary <= tap.min) {
        netoSalary = grossSalary - employeeSocialContribution - employeeHealthContribution;
        result.innerHTML = netoSalary;
    } else if (grossSalary > tap.min && grossSalary <= tap.max) {
        tapMinSalaryTax = (grossSalary - tap.min) * tapMinTaxPercentage;
        netoSalary = grossSalary - employeeSocialContribution - employeeHealthContribution - tapMinSalaryTax;
        result.innerHTML = netoSalary;
    } else {
        let tapMaxSalaryTax = (grossSalary - tap.max) * tapMaxTaxPercentage;
        let tapMinSalaryTax = (tap.max - tap.min) * tapMinTaxPercentage;
        let tapSalaryTax = tapMaxSalaryTax + tapMinSalaryTax;

        netoSalary = grossSalary - employeeSocialContribution - employeeHealthContribution - tapSalaryTax;
        result.innerHTML = netoSalary;
    }

}
