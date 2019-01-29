export class Salary {
    constructor(grossSalary,
        employeeSocialContribution,
        employeeHealthContribution,
        employerSocialContribution,
        employerHealthContribution,
        tapSalaryTax,
        netSalary,
        totalExpense) {
        this.grossSalary = grossSalary;
        this.employeeSocialContribution = employeeSocialContribution;
        this.employeeHealthContribution = employeeHealthContribution;
        this.employerSocialContribution = employerSocialContribution;
        this.employerHealthContribution = employerHealthContribution;
        this.tapSalaryTax = tapSalaryTax;
        this.netSalary = netSalary;
        this.totalExpense = totalExpense;
    }
}