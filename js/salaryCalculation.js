import { tap } from './tap.js';
import { Salary } from './salary.js';
import { netSalaryRate } from './netSalaryRate.js';

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
        } else if (grossSalary > tap.min && grossSalary <= tap.max) {
            this.tapSalaryTax = (grossSalary - tap.min) * this.tapMinTaxPercentage;
            this.netSalary = grossSalary - this.employeeSocialContribution - this.employeeHealthContribution - this.tapSalaryTax;

            this.salary = new Salary(grossSalary, this.employeeSocialContribution, this.employeeHealthContribution, this.employerSocialContribution, this.employerHealthContribution, this.tapSalaryTax, this.netSalary, this.totalExpense);
        } else {
            let tapMaxSalaryTax = (grossSalary - tap.max) * this.tapMaxTaxPercentage;
            let tapMinSalaryTax = (tap.max - tap.min) * this.tapMinTaxPercentage;
            this.tapSalaryTax = tapMaxSalaryTax + tapMinSalaryTax;

            this.netSalary = grossSalary - this.employeeSocialContribution - this.employeeHealthContribution - this.tapSalaryTax;
            this.salary = new Salary(grossSalary, this.employeeSocialContribution, this.employeeHealthContribution, this.employerSocialContribution, this.employerHealthContribution, this.tapSalaryTax, this.netSalary, this.totalExpense);
        }

        return this.salary;
    }

    calculateGrossSalary(netSalary) {
        if (netSalary <= netSalaryRate.min) {
            this.grossSalary = netSalary / (1 - (this.employeeSocialContributionPercentage + this.employeeHealthContributionPercentage));
            this.calculateContributions(this.grossSalary);
            this.salary = new Salary(this.grossSalary, this.employeeSocialContribution, this.employeeHealthContribution, this.employerSocialContribution, this.employerHealthContribution, this.tapSalaryTax, netSalary, this.totalExpense);
        } else if (netSalary > netSalaryRate.min && netSalary <= netSalaryRate.medium) {
            this.grossSalary = (netSalary - tap.min * this.tapMinTaxPercentage) / (1 - this.tapMinTaxPercentage - (this.employeeSocialContributionPercentage + this.employeeHealthContributionPercentage));
            this.calculateContributions(this.grossSalary);
            this.tapSalaryTax = (this.grossSalary - tap.min) * this.tapMinTaxPercentage;
            this.salary = new Salary(this.grossSalary, this.employeeSocialContribution, this.employeeHealthContribution, this.employerSocialContribution, this.employerHealthContribution, this.tapSalaryTax, netSalary, this.totalExpense);
        } else if (netSalary > netSalaryRate.medium && netSalary <= netSalaryRate.max) {
            this.grossSalary = (netSalary - tap.min * this.tapMinTaxPercentage + this.maxSalary * this.employeeSocialContributionPercentage) / (1 - this.tapMinTaxPercentage - this.employeeHealthContributionPercentage);
            this.calculateContributions(this.grossSalary);
            this.tapSalaryTax = (this.grossSalary - tap.min) * this.tapMinTaxPercentage;
            this.salary = new Salary(this.grossSalary, this.employeeSocialContribution, this.employeeHealthContribution, this.employerSocialContribution, this.employerHealthContribution, this.tapSalaryTax, netSalary, this.totalExpense);
        } else {
            this.grossSalary = (netSalary + (tap.max - tap.min) * this.tapMinTaxPercentage - this.tapMaxTaxPercentage * tap.max + this.maxSalary * this.employeeSocialContributionPercentage) / (1 - this.tapMaxTaxPercentage - this.employeeHealthContributionPercentage);
            this.calculateContributions(this.grossSalary);
            this.tapMaxSalaryTax = (this.grossSalary - tap.max) * this.tapMaxTaxPercentage;
            this.tapMinSalaryTax = (tap.max - tap.min) * this.tapMinTaxPercentage;
            this.tapSalaryTax = this.tapMaxSalaryTax + this.tapMinSalaryTax;
            this.salary = new Salary(this.grossSalary, this.employeeSocialContribution, this.employeeHealthContribution, this.employerSocialContribution, this.employerHealthContribution, this.tapSalaryTax, netSalary, this.totalExpense);
        }

        return this.salary;
    }
}