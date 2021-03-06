function generateResults(salary) {
    let results = '';
    results += `<section class="result">
        <div><span>Paga Bruto: </span><span>${Math.round(salary.grossSalary)}</span></div>
        <div><span>Paga Neto: </span><span>${Math.round(salary.netSalary)}</span></div>
    </section>`;

    return results;
}

function generateTotal(salary) {
    let total = '';
    total += `<section class="result">Shpenzime total: ${Math.round(salary.totalExpense)}</section>`;
    return total;
}

export function populateResults(salary) {
    result.innerHTML = generateResults(salary);
}

export function populateTotal(salary) {
    total.innerHTML = generateTotal(salary);
}