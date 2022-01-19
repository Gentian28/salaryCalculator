import * as jsonData from '../lang/lang.json';
import { appState } from './stateManager'

function generateResults(salary) {
    let results = '';
    results += `<section class="result">
        <div><span>${jsonData[appState.language].grossSalaryLabel}: </span><span>${Math.round(salary.grossSalary)}</span></div>
        <div><span>${jsonData[appState.language].netSalaryLabel}: </span><span>${Math.round(salary.netSalary)}</span></div>
    </section>`;

    return results;
}

function generateTotal(salary) {
    let total = '';
    total += `<section class="result">${jsonData[appState.language].totalExpensesLabel}: ${Math.round(salary.totalExpense)}</section>`;
    return total;
}

export function populateResults(salary) {
    result.innerHTML = generateResults(salary);
}

export function populateTotal(salary) {
    total.innerHTML = generateTotal(salary);
}