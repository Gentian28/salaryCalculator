export class Salary {
    constructor(grossSalary,
        employeeSocialContribution,
        employeeHealthContribution,
        employerSocialContribution,
        employerHealthContribution,
        tapSalaryTax,
        netoSalary,
        totalExpense) {
        this.grossSalary = grossSalary;
        this.employeeSocialContribution = employeeSocialContribution;
        this.employeeHealthContribution = employeeHealthContribution;
        this.employerSocialContribution = employerSocialContribution;
        this.employerHealthContribution = employerHealthContribution;
        this.tapSalaryTax = tapSalaryTax;
        this.netoSalary = netoSalary;
        this.totalExpense = totalExpense;
    }
}