import { tap } from './tap.js';
import { Salary } from './salary.js';

class SalaryCalculator {
    constructor() {

    }
    calculateContributions() {

    }

    calculateNet() {

    }

    calculateGross() {

    }
}

export class SalaryCalculator2021 extends SalaryCalculator {
    constructor() {
        super();
    }

    employeeSocialContributionPercentage = 9.5 / 100;
    employeeHealthContributionPercentage = 1.7 / 100;

    employerSocialContributionPercentage = 15 / 100;
    employerHealthContributionPercentage = 1.7 / 100;

    tapMinTaxPercentage = 13 / 100;
    tapMaxTaxPercentage = 23 / 100;
    minSalary = 30000; //26000
    minNetSalary = 26640; //23088
    maxSalary = 132312; // 114670
    grossSalary;
    netSalary;
    totalExpense;
    employeeSocialContribution;
    employeeHealthContribution;
    employerSocialContribution;
    employerHealthContribution;
    tapSalaryTax = 0;
    converteCourse;
    salary;

    calculateContributions(grossSalary) {
        if (grossSalary >= this.maxSalary) {
            this.employeeSocialContribution = this.maxSalary * this.employeeSocialContributionPercentage;
            this.employerSocialContribution = this.maxSalary * this.employerSocialContributionPercentage;
        } else {
            this.employeeSocialContribution = grossSalary * this.employeeSocialContributionPercentage;
            this.employerSocialContribution = grossSalary * this.employerSocialContributionPercentage;
        }
    
        // calculate employee health contribution
        this.employeeHealthContribution = grossSalary * this.employeeHealthContributionPercentage;
    
        // calculate employer health contribution
        this.employerHealthContribution = grossSalary * this.employerHealthContributionPercentage;
    
        // calculate total expense
        this.totalExpense = grossSalary + this.employerHealthContribution + this.employerSocialContribution;
    }

    calculateNetSalary(grossSalary) {
        this.calculateContributions(grossSalary);
        if (grossSalary <= tap.min) {
            this.netSalary = grossSalary - (this.employeeSocialContribution + this.employeeHealthContribution);
            this.salary = new Salary(grossSalary, this.employeeSocialContribution, this.employeeHealthContribution, this.employerSocialContribution, this.employerHealthContribution, this.tapSalaryTax, this.netSalary, this.totalExpense);
            console.log(this.salary);
        } else if (grossSalary > tap.min && grossSalary <= tap.max) {
            this.tapSalaryTax = (grossSalary - tap.min) * this.tapMinTaxPercentage;
            this.netSalary = grossSalary - this.employeeSocialContribution - this.employeeHealthContribution - this.tapSalaryTax;

            this.salary = new Salary(grossSalary, this.employeeSocialContribution, this.employeeHealthContribution, this.employerSocialContribution, this.employerHealthContribution, this.tapSalaryTax, this.netSalary, this.totalExpense);
            console.log(this.salary);
        } else {
            let tapMaxSalaryTax = (grossSalary - tap.max) * this.tapMaxTaxPercentage;
            let tapMinSalaryTax = (tap.max - tap.min) * this.tapMinTaxPercentage;
            this.tapSalaryTax = tapMaxSalaryTax + tapMinSalaryTax;

            this.netSalary = grossSalary - this.employeeSocialContribution - this.employeeHealthContribution - this.tapSalaryTax;
            this.salary = new Salary(grossSalary, this.employeeSocialContribution, this.employeeHealthContribution, this.employerSocialContribution, this.employerHealthContribution, this.tapSalaryTax, this.netSalary, this.totalExpense);
            console.log(this.salary);
        }

        return this.salary;
    }
}