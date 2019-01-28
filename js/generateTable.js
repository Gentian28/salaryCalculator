function generateTable(salary) {
    let expensesTable = '';
    expensesTable += `<table class="table table-striped table-hover">
        <thead class="thead-dark">
            <tr>
                <td></td>
                <td>Punonjësi</td>
                <td>Punëdhënësi</td>
                <td>Totali</td>
            </tr>
        </thead>
        <tbody>
            <tr id="trTap">
                <td>TAP</td>
                <td>${Math.round(salary.tapSalaryTax)}</td>
                <td>0</td>
                <td>${Math.round(salary.tapSalaryTax)}</td>
            </tr>
            <tr>
                <td>Sigurimet Shoqërore</td>
                <td>${Math.round(salary.employeeSocialContribution)}</td>
                <td>${Math.round(salary.employerSocialContribution)}</td>
                <td>${Math.round(salary.employeeSocialContribution) + Math.round(salary.employerSocialContribution)}</td>
            </tr>
            <tr>
                <td>Sigurimet Shëndetësore</td>
                <td>${Math.round(salary.employeeHealthContribution)}</td>
                <td>${Math.round(salary.employerHealthContribution)}</td>
                <td>${Math.round(salary.employeeHealthContribution) + Math.round(salary.employerHealthContribution)}</td>
            </tr>
            <tr>
                <td>Totali</td>
                <td>${Math.round(salary.tapSalaryTax) + Math.round(salary.employeeSocialContribution) + Math.round(salary.employeeHealthContribution)}</td>
                <td>${Math.round(salary.employerSocialContribution) + Math.round(salary.employerHealthContribution)}</td>
                <td>${Math.round(salary.tapSalaryTax) + Math.round(salary.employeeSocialContribution) + Math.round(salary.employerSocialContribution) + Math.round(salary.employeeHealthContribution) + Math.round(salary.employerHealthContribution)}</td>
            </tr>
        </tbody>
    </table>`;

    return expensesTable;
}

export function populateExpensesTable(salary) {
    expensesTable.innerHTML = generateTable(salary);
}