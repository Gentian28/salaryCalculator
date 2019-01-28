import { tap } from './tap.js';
import { Salary } from './salary.js';
import { populateExpensesTable } from './generateTable.js';

const employeeSocialContributionPercentage = 9.5 / 100;
const employeeHealthContributionPercentage = 1.7 / 100;

const employerSocialContributionPercentage = 15 / 100;
const employerHealthContributionPercentage = 1.7 / 100;

const tapMinTaxPercentage = 13 / 100;
const tapMaxTaxPercentage = 23 / 100;
const minSalary = 26000;
const maxSalary = 114670;
let grossSalary;
let netoSalary;
let totalExpense;
let employeeSocialContribution;
let employeeHealthContribution;
let employerSocialContribution;
let employerHealthContribution;
let tapSalaryTax = 0;

calculate.onclick = function () {
    // get Salary value
    grossSalary = parseInt(SalaryValue.value);

    // calculate employee and employer social contribution
    if (grossSalary >= maxSalary) {
        employeeSocialContribution = maxSalary * employeeSocialContributionPercentage;
        employerSocialContribution = maxSalary * employerSocialContributionPercentage;
    } else {
        employeeSocialContribution = grossSalary * employeeSocialContributionPercentage;
        employerSocialContribution = grossSalary * employerSocialContributionPercentage;
    }

    // calculate employee health contribution
    employeeHealthContribution = grossSalary * employeeHealthContributionPercentage;

    // calculate employer health contribution
    employerHealthContribution = grossSalary * employerHealthContributionPercentage;

    // calculate total expense
    totalExpense = grossSalary + employerHealthContribution + employerSocialContribution;

    if (grossSalary <= tap.min) {
        netoSalary = grossSalary - employeeSocialContribution - employeeHealthContribution;
        let salary = new Salary(grossSalary, employeeSocialContribution, employeeHealthContribution, employerSocialContribution, employerHealthContribution, tapSalaryTax, netoSalary, totalExpense);
        console.log(salary);
        populateExpensesTable(salary);
        result.innerHTML = netoSalary;
    } else if (grossSalary > tap.min && grossSalary <= tap.max) {
        let tapSalaryTax = (grossSalary - tap.min) * tapMinTaxPercentage;
        netoSalary = grossSalary - employeeSocialContribution - employeeHealthContribution - tapSalaryTax;

        let salary = new Salary(grossSalary, employeeSocialContribution, employeeHealthContribution, employerSocialContribution, employerHealthContribution, tapSalaryTax, netoSalary, totalExpense);
        console.log(salary);
        populateExpensesTable(salary);
        result.innerHTML = netoSalary;
    } else {
        let tapMaxSalaryTax = (grossSalary - tap.max) * tapMaxTaxPercentage;
        let tapMinSalaryTax = (tap.max - tap.min) * tapMinTaxPercentage;
        let tapSalaryTax = tapMaxSalaryTax + tapMinSalaryTax;

        netoSalary = grossSalary - employeeSocialContribution - employeeHealthContribution - tapSalaryTax;
        let salary = new Salary(grossSalary, employeeSocialContribution, employeeHealthContribution, employerSocialContribution, employerHealthContribution, tapSalaryTax, netoSalary, totalExpense);
        console.log(salary);
        populateExpensesTable(salary);
        result.innerHTML = netoSalary;
    }
}
