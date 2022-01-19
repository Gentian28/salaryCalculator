import * as jsonData from '../lang/lang.json';
import { appState } from './stateManager'

function generateTable(salary) {
    let expensesTable = '';
    expensesTable += `<table class="table table-striped table-hover">
        <thead class="thead-dark">
            <tr>
                <td></td>
                <td>${jsonData[appState.language].employeeCoulmnHeader}</td>
                <td>${jsonData[appState.language].employerCoulmnHeader}</td>
                <td>${jsonData[appState.language].totalLabel}</td>
            </tr>
        </thead>
        <tbody>
            <tr id="trTap">
                <td>${jsonData[appState.language].incomeTaxLabel}</td>
                <td>${Math.round(salary.tapSalaryTax)}</td>
                <td>0</td>
                <td>${Math.round(salary.tapSalaryTax)}</td>
            </tr>
            <tr>
                <td>${jsonData[appState.language].socialContributions}</td>
                <td>${Math.round(salary.employeeSocialContribution)}</td>
                <td>${Math.round(salary.employerSocialContribution)}</td>
                <td>${Math.round(salary.employeeSocialContribution) + Math.round(salary.employerSocialContribution)}</td>
            </tr>
            <tr>
                <td>${jsonData[appState.language].healthContributions}</td>
                <td>${Math.round(salary.employeeHealthContribution)}</td>
                <td>${Math.round(salary.employerHealthContribution)}</td>
                <td>${Math.round(salary.employeeHealthContribution) + Math.round(salary.employerHealthContribution)}</td>
            </tr>
            <tr>
                <td>${jsonData[appState.language].totalLabel}</td>
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