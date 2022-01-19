import * as jsonData from '../lang/lang.json';
import { appState } from './stateManager'

function generateMobileTable(salary) {
    let expensesTable = '';
    expensesTable += `<table class="table table-mobile table-striped table-hover">
        <thead class="thead-dark">
            <tr>
                <td colspan="2">${jsonData[appState.language].employeeCoulmnHeader}</td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>${jsonData[appState.language].incomeTaxLabel}</td>
                <td>${Math.round(salary.tapSalaryTax)}</td>
            </tr>
            <tr>
                <td>${jsonData[appState.language].socialContributions}</td>
                <td>${Math.round(salary.employeeSocialContribution)}</td>
            </tr>
            <tr>
                <td>${jsonData[appState.language].healthContributions}</td>
                <td>${Math.round(salary.employeeHealthContribution)}</td>
            </tr>
            <tr>
                <td>${jsonData[appState.language].totalLabel}</td>
                <td>${Math.round(salary.tapSalaryTax) + Math.round(salary.employeeSocialContribution) + Math.round(salary.employeeHealthContribution)}</td>
            </tr>
        </tbody>
    </table>

    <table class="table table-mobile table-striped table-hover">
        <thead class="thead-dark">
            <tr>
                <td colspan="2">${jsonData[appState.language].employerCoulmnHeader}</td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>${jsonData[appState.language].socialContributions}</td>
                <td>${Math.round(salary.employerSocialContribution)}</td>
            </tr>
            <tr>
                <td>${jsonData[appState.language].healthContributions}</td>
                <td>${Math.round(salary.employerHealthContribution)}</td>
            </tr>
            <tr>
                <td>${jsonData[appState.language].totalLabel}</td>
                <td>${Math.round(salary.employerSocialContribution) + Math.round(salary.employerHealthContribution)}</td>
            </tr>
        </tbody>
    </table>`;

    return expensesTable;
}

export function populateMobileExpensesTable(salary) {
    expensesTable.innerHTML = generateMobileTable(salary);
}