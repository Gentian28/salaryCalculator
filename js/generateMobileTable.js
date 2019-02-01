function generateMobileTable(salary) {
    let expensesTable = '';
    expensesTable += `<table class="table table-mobile table-striped table-hover">
        <thead class="thead-dark">
            <tr>
                <td colspan="2">Për punonjësit</td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>TAP</td>
                <td>${Math.round(salary.tapSalaryTax)}</td>
            </tr>
            <tr>
                <td>Sigurimet Shoqërore</td>
                <td>${Math.round(salary.employeeSocialContribution)}</td>
            </tr>
            <tr>
                <td>Sigurimet Shëndetësore</td>
                <td>${Math.round(salary.employeeHealthContribution)}</td>
            </tr>
            <tr>
                <td>Totali</td>
                <td>${Math.round(salary.tapSalaryTax) + Math.round(salary.employeeSocialContribution) + Math.round(salary.employeeHealthContribution)}</td>
            </tr>
        </tbody>
    </table>

    <table class="table table-mobile table-striped table-hover">
        <thead class="thead-dark">
            <tr>
                <td colspan="2">Për punëdhënësit</td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Sigurimet Shoqërore</td>
                <td>${Math.round(salary.employerSocialContribution)}</td>
            </tr>
            <tr>
                <td>Sigurimet Shëndetësore</td>
                <td>${Math.round(salary.employerHealthContribution)}</td>
            </tr>
            <tr>
                <td>Totali</td>
                <td>${Math.round(salary.employerSocialContribution) + Math.round(salary.employerHealthContribution)}</td>
            </tr>
        </tbody>
    </table>`;

    return expensesTable;
}

export function populateMobileExpensesTable(salary) {
    expensesTable.innerHTML = generateMobileTable(salary);
}