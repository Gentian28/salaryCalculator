import { tap } from './tap.js';

class Salaray {
    constructor(grossSalary, employeeSocialContribution, employeeHealthContribution, employerSocialContribution, employerHealthContribution, tapSalaryTax, netoSalary) {
        this.grossSalary = grossSalary;
        this.employeeSocialContribution = employeeSocialContribution;
        this.employeeHealthContribution = employeeHealthContribution;
        this.employerSocialContribution = employerSocialContribution;
        this.employerHealthContribution = employerHealthContribution;
        this.tapSalaryTax = tapSalaryTax;
        this.netoSalary = netoSalary;
    }
}

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
let employeeSocialContribution;
let employeeHealthContribution;
let employerSocialContribution;
let employerHealthContribution;
let tapSalaryTax = 0;

calculate.onclick = function () {
    // get Salary value
    grossSalary = SalaryValue.value;

    // calculate employee social contribution
    if (grossSalary >= maxSalary) {
        employeeSocialContribution = maxSalary * employeeSocialContributionPercentage;
    } else {
        employeeSocialContribution = grossSalary * employeeSocialContributionPercentage;
    }

    // calculate employer social contribution
    if (grossSalary >= maxSalary) {
        employerSocialContribution = maxSalary * employerSocialContributionPercentage;
    } else {
        employerSocialContribution = grossSalary * employerSocialContributionPercentage;
    }

    // calculate employee health contribution
    employeeHealthContribution = grossSalary * employeeHealthContributionPercentage;

    // calculate employer health contribution
    employerHealthContribution = grossSalary * employerHealthContributionPercentage;

    if (grossSalary <= tap.min) {
        netoSalary = grossSalary - employeeSocialContribution - employeeHealthContribution;
        let salary = new Salaray(grossSalary, employeeSocialContribution, employeeHealthContribution, employerSocialContribution, employerHealthContribution, tapSalaryTax, netoSalary);
        console.log(salary);
        result.innerHTML = netoSalary;
    } else if (grossSalary > tap.min && grossSalary <= tap.max) {
        let tapSalaryTax = (grossSalary - tap.min) * tapMinTaxPercentage;
        netoSalary = grossSalary - employeeSocialContribution - employeeHealthContribution - tapSalaryTax;

        let salary = new Salaray(grossSalary, employeeSocialContribution, employeeHealthContribution, employerSocialContribution, employerHealthContribution, tapSalaryTax, netoSalary);
        console.log(salary);
        result.innerHTML = netoSalary;
    } else {
        let tapMaxSalaryTax = (grossSalary - tap.max) * tapMaxTaxPercentage;
        let tapMinSalaryTax = (tap.max - tap.min) * tapMinTaxPercentage;
        let tapSalaryTax = tapMaxSalaryTax + tapMinSalaryTax;

        netoSalary = grossSalary - employeeSocialContribution - employeeHealthContribution - tapSalaryTax;
        let salary = new Salaray(grossSalary, employeeSocialContribution, employeeHealthContribution, employerSocialContribution, employerHealthContribution, tapSalaryTax, netoSalary);
        console.log(salary);
        result.innerHTML = netoSalary;
    }
}
