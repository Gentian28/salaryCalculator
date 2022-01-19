import * as jsonData from '../lang/lang.json';
console.log(jsonData);
import { appState } from './stateManager';
import { Salary } from './salary.js';
import { tap } from './tap.js';
import { netSalaryRate } from './netSalaryRate.js';
import { populateExpensesTable } from './generateTable.js';
import { populateMobileExpensesTable } from './generateMobileTable.js';
import { populateResults, populateTotal } from './salaryResult.js';

const employeeSocialContributionPercentage = 9.5 / 100;
const employeeHealthContributionPercentage = 1.7 / 100;

const employerSocialContributionPercentage = 15 / 100;
const employerHealthContributionPercentage = 1.7 / 100;

const tapMinTaxPercentage = 13 / 100;
const tapMaxTaxPercentage = 23 / 100;
const minSalary = 30000; //26000
const minNetSalary = 26640; //23088
const maxSalary = 132312; // 114670
let grossSalary;
let netSalary;
let totalExpense;
let employeeSocialContribution;
let employeeHealthContribution;
let employerSocialContribution;
let employerHealthContribution;
let tapSalaryTax = 0;
let converteCourse;

window.onkeydown = function () {
    if (event.keyCode == 13) {
        event.preventDefault();
        return false;
    }
}

const calculateContributions = function (grossSalary) {
    // calculate employee and employer social contribution
    if (grossSalary >= maxSalary) {
        employeeSocialContribution = maxSalary * employeeSocialContributionPercentage;
        employerSocialContribution = maxSalary * employerSocialContributionPercentage;
    } else {
        employeeSocialContribution = grossSalary * employeeSocialContributionPercentage;
        employerSocialContribution = grossSalary * employerSocialContributionPercentage;
    }

    // calculate employee health contribution
    employeeHealthContribution = grossSalary * employeeHealthContributionPercentage;

    // calculate employer health contribution
    employerHealthContribution = grossSalary * employerHealthContributionPercentage;

    // calculate total expense
    totalExpense = grossSalary + employerHealthContribution + employerSocialContribution;
}

calculateNet.onclick = async function () {
    switch (currency.value) {
        case 'eur':
            converteCourse = await axios.get('https://free.currconv.com/api/v7/convert?q=EUR_ALL&compact=ultra&apiKey=17e0bf83ad97d32d9c38');
            grossSalary = parseInt(SalaryValue.value) * converteCourse.data.EUR_ALL;
            break;
        case 'usd':
            converteCourse = await axios.get('https://free.currconv.com/api/v7/convert?q=USD_ALL&compact=ultra&apiKey=17e0bf83ad97d32d9c38');
            grossSalary = parseInt(SalaryValue.value) * converteCourse.data.USD_ALL;
            break;
        default:
            grossSalary = parseInt(SalaryValue.value);

    }
    if (isNaN(grossSalary)) {
        document.querySelectorAll('#allResults')[0].style.display = 'none';
        document.querySelectorAll('#message')[0].style.display = 'block';
        message.innerHTML = `<div class="message error">Ju lutem vendosni nje vlere!</div>`;
    } else if (grossSalary < minSalary) {
        document.querySelectorAll('#allResults')[0].style.display = 'none';
        document.querySelectorAll('#message')[0].style.display = 'block';
        message.innerHTML = `<div class="message error">Vlera e pagës nuk mund te jetë me e ulët se paga minimale!</div>`;
    } else {
        document.querySelectorAll('#message')[0].style.display = 'none';
        document.querySelectorAll('#allResults')[0].style.display = 'block';
        calculateContributions(grossSalary);

        if (grossSalary <= tap.min) {
            netSalary = grossSalary - employeeSocialContribution - employeeHealthContribution;
            let salary = new Salary(grossSalary, employeeSocialContribution, employeeHealthContribution, employerSocialContribution, employerHealthContribution, tapSalaryTax, netSalary, totalExpense);
            console.log(salary);
            populateResults(salary);
            if (window.innerWidth < 500) {
                populateMobileExpensesTable(salary);
            } else {
                populateExpensesTable(salary);
            }
            populateTotal(salary);
        } else if (grossSalary > tap.min && grossSalary <= tap.max) {
            let tapSalaryTax = (grossSalary - tap.min) * tapMinTaxPercentage;
            netSalary = grossSalary - employeeSocialContribution - employeeHealthContribution - tapSalaryTax;

            let salary = new Salary(grossSalary, employeeSocialContribution, employeeHealthContribution, employerSocialContribution, employerHealthContribution, tapSalaryTax, netSalary, totalExpense);
            console.log(salary);
            populateResults(salary);
            if (window.innerWidth < 500) {
                populateMobileExpensesTable(salary);
            } else {
                populateExpensesTable(salary);
            }
            populateTotal(salary);
        } else {
            let tapMaxSalaryTax = (grossSalary - tap.max) * tapMaxTaxPercentage;
            let tapMinSalaryTax = (tap.max - tap.min) * tapMinTaxPercentage;
            let tapSalaryTax = tapMaxSalaryTax + tapMinSalaryTax;

            netSalary = grossSalary - employeeSocialContribution - employeeHealthContribution - tapSalaryTax;
            let salary = new Salary(grossSalary, employeeSocialContribution, employeeHealthContribution, employerSocialContribution, employerHealthContribution, tapSalaryTax, netSalary, totalExpense);
            console.log(salary);
            populateResults(salary);
            if (window.innerWidth < 500) {
                populateMobileExpensesTable(salary);
            } else {
                populateExpensesTable(salary);
            }
            populateTotal(salary);
        }
    }
}

calculateGross.onclick = async function () {
    // get Net Salary value
    switch (currency.value) {
        case 'eur':
            converteCourse = await axios.get('https://free.currconv.com/api/v7/convert?q=EUR_ALL&compact=ultra&apiKey=17e0bf83ad97d32d9c38');
            netSalary = parseInt(SalaryValue.value) * converteCourse.data.EUR_ALL;
            break;
        case 'usd':
            converteCourse = await axios.get('https://free.currconv.com/api/v7/convert?q=USD_ALL&compact=ultra&apiKey=17e0bf83ad97d32d9c38');
            netSalary = parseInt(SalaryValue.value) * converteCourse.data.USD_ALL;
            break;
        default:
            netSalary = parseInt(SalaryValue.value);
    }

    if (isNaN(netSalary)) {
        document.querySelectorAll('#allResults')[0].style.display = 'none';
        document.querySelectorAll('#message')[0].style.display = 'block';
        message.innerHTML = `<div class="message error">Ju lutem vendosni nje vlere!</div>`;
    } else if (netSalary < minNetSalary) {
        document.querySelectorAll('#allResults')[0].style.display = 'none';
        document.querySelectorAll('#message')[0].style.display = 'block';
        message.innerHTML = `<div class="message error">Vlera e pagës nuk mund te jetë me e ulët se paga minimale!</div>`;
    } else {
        document.querySelectorAll('#message')[0].style.display = 'none';
        document.querySelectorAll('#allResults')[0].style.display = 'block';

        if (netSalary <= netSalaryRate.min) {
            grossSalary = netSalary / (1 - (employeeSocialContributionPercentage + employeeHealthContributionPercentage));
            calculateContributions(grossSalary);
            let salary = new Salary(grossSalary, employeeSocialContribution, employeeHealthContribution, employerSocialContribution, employerHealthContribution, tapSalaryTax, netSalary, totalExpense);
            console.log(salary);
            populateResults(salary);
            if (window.innerWidth < 500) {
                populateMobileExpensesTable(salary);
            } else {
                populateExpensesTable(salary);
            }
            populateTotal(salary);
        } else if (netSalary > netSalaryRate.min && netSalary <= netSalaryRate.medium) {
            grossSalary = (netSalary - tap.min * tapMinTaxPercentage) / (1 - tapMinTaxPercentage - (employeeSocialContributionPercentage + employeeHealthContributionPercentage));
            calculateContributions(grossSalary);
            let tapSalaryTax = (grossSalary - tap.min) * tapMinTaxPercentage;
            let salary = new Salary(grossSalary, employeeSocialContribution, employeeHealthContribution, employerSocialContribution, employerHealthContribution, tapSalaryTax, netSalary, totalExpense);
            console.log(salary);
            populateResults(salary);
            if (window.innerWidth < 500) {
                populateMobileExpensesTable(salary);
            } else {
                populateExpensesTable(salary);
            }
            populateTotal(salary);
        } else if (netSalary > netSalaryRate.medium && netSalary <= netSalaryRate.max) {
            grossSalary = (netSalary - tap.min * tapMinTaxPercentage + maxSalary * employeeSocialContributionPercentage) / (1 - tapMinTaxPercentage - employeeHealthContributionPercentage);
            calculateContributions(grossSalary);
            let tapSalaryTax = (grossSalary - tap.min) * tapMinTaxPercentage;
            let salary = new Salary(grossSalary, employeeSocialContribution, employeeHealthContribution, employerSocialContribution, employerHealthContribution, tapSalaryTax, netSalary, totalExpense);
            console.log(salary);
            populateResults(salary);
            if (window.innerWidth < 500) {
                populateMobileExpensesTable(salary);
            } else {
                populateExpensesTable(salary);
            }
            populateTotal(salary);
        } else {
            grossSalary = (netSalary + (tap.max - tap.min) * tapMinTaxPercentage - tapMaxTaxPercentage * tap.max + maxSalary * employeeSocialContributionPercentage) / (1 - tapMaxTaxPercentage - employeeHealthContributionPercentage);
            calculateContributions(grossSalary);
            let tapMaxSalaryTax = (grossSalary - tap.max) * tapMaxTaxPercentage;
            let tapMinSalaryTax = (tap.max - tap.min) * tapMinTaxPercentage;
            let tapSalaryTax = tapMaxSalaryTax + tapMinSalaryTax;
            let salary = new Salary(grossSalary, employeeSocialContribution, employeeHealthContribution, employerSocialContribution, employerHealthContribution, tapSalaryTax, netSalary, totalExpense);
            console.log(salary);
            populateResults(salary);
            if (window.innerWidth < 500) {
                populateMobileExpensesTable(salary);
            } else {
                populateExpensesTable(salary);
            }
            populateTotal(salary);
        }
    }
}

// import {jsonData} from '../lang/lang.json';

const salaryValueLabel = document.getElementsByName('SalaryValueLabel')[0];

headerPageName.innerHTML = jsonData[appState.language].header;
salaryValueLabel.innerHTML = jsonData[appState.language].salaryValueLabel;
SalaryValue.placeholder = jsonData[appState.language].salaryValueInput;
calculateNet.innerHTML = jsonData[appState.language].grossToNetButton;
calculateGross.innerHTML = jsonData[appState.language].netToGrossButton;

language.onchange = async function(event) {
    appState.setLanguage(event.target.value);
    headerPageName.innerHTML = jsonData[appState.language].header;
    salaryValueLabel.innerHTML = jsonData[appState.language].salaryValueLabel;
    SalaryValue.placeholder = jsonData[appState.language].salaryValueInput;
    calculateNet.innerHTML = jsonData[appState.language].grossToNetButton;
    calculateGross.innerHTML = jsonData[appState.language].netToGrossButton;
    
    // duplicated logic from on click
    {
        switch (currency.value) {
            case 'eur':
                converteCourse = await axios.get('https://free.currconv.com/api/v7/convert?q=EUR_ALL&compact=ultra&apiKey=17e0bf83ad97d32d9c38');
                netSalary = parseInt(SalaryValue.value) * converteCourse.data.EUR_ALL;
                break;
            case 'usd':
                converteCourse = await axios.get('https://free.currconv.com/api/v7/convert?q=USD_ALL&compact=ultra&apiKey=17e0bf83ad97d32d9c38');
                netSalary = parseInt(SalaryValue.value) * converteCourse.data.USD_ALL;
                break;
            default:
                netSalary = parseInt(SalaryValue.value);
        }
    
        if (isNaN(netSalary)) {
            document.querySelectorAll('#allResults')[0].style.display = 'none';
            document.querySelectorAll('#message')[0].style.display = 'block';
            message.innerHTML = `<div class="message error">Ju lutem vendosni nje vlere!</div>`;
        } else if (netSalary < minNetSalary) {
            document.querySelectorAll('#allResults')[0].style.display = 'none';
            document.querySelectorAll('#message')[0].style.display = 'block';
            message.innerHTML = `<div class="message error">Vlera e pagës nuk mund te jetë me e ulët se paga minimale!</div>`;
        } else {
            document.querySelectorAll('#message')[0].style.display = 'none';
            document.querySelectorAll('#allResults')[0].style.display = 'block';
    
            if (netSalary <= netSalaryRate.min) {
                grossSalary = netSalary / (1 - (employeeSocialContributionPercentage + employeeHealthContributionPercentage));
                calculateContributions(grossSalary);
                let salary = new Salary(grossSalary, employeeSocialContribution, employeeHealthContribution, employerSocialContribution, employerHealthContribution, tapSalaryTax, netSalary, totalExpense);
                console.log(salary);
                populateResults(salary);
                if (window.innerWidth < 500) {
                    populateMobileExpensesTable(salary);
                } else {
                    populateExpensesTable(salary);
                }
                populateTotal(salary);
            } else if (netSalary > netSalaryRate.min && netSalary <= netSalaryRate.medium) {
                grossSalary = (netSalary - tap.min * tapMinTaxPercentage) / (1 - tapMinTaxPercentage - (employeeSocialContributionPercentage + employeeHealthContributionPercentage));
                calculateContributions(grossSalary);
                let tapSalaryTax = (grossSalary - tap.min) * tapMinTaxPercentage;
                let salary = new Salary(grossSalary, employeeSocialContribution, employeeHealthContribution, employerSocialContribution, employerHealthContribution, tapSalaryTax, netSalary, totalExpense);
                console.log(salary);
                populateResults(salary);
                if (window.innerWidth < 500) {
                    populateMobileExpensesTable(salary);
                } else {
                    populateExpensesTable(salary);
                }
                populateTotal(salary);
            } else if (netSalary > netSalaryRate.medium && netSalary <= netSalaryRate.max) {
                grossSalary = (netSalary - tap.min * tapMinTaxPercentage + maxSalary * employeeSocialContributionPercentage) / (1 - tapMinTaxPercentage - employeeHealthContributionPercentage);
                calculateContributions(grossSalary);
                let tapSalaryTax = (grossSalary - tap.min) * tapMinTaxPercentage;
                let salary = new Salary(grossSalary, employeeSocialContribution, employeeHealthContribution, employerSocialContribution, employerHealthContribution, tapSalaryTax, netSalary, totalExpense);
                console.log(salary);
                populateResults(salary);
                if (window.innerWidth < 500) {
                    populateMobileExpensesTable(salary);
                } else {
                    populateExpensesTable(salary);
                }
                populateTotal(salary);
            } else {
                grossSalary = (netSalary + (tap.max - tap.min) * tapMinTaxPercentage - tapMaxTaxPercentage * tap.max + maxSalary * employeeSocialContributionPercentage) / (1 - tapMaxTaxPercentage - employeeHealthContributionPercentage);
                calculateContributions(grossSalary);
                let tapMaxSalaryTax = (grossSalary - tap.max) * tapMaxTaxPercentage;
                let tapMinSalaryTax = (tap.max - tap.min) * tapMinTaxPercentage;
                let tapSalaryTax = tapMaxSalaryTax + tapMinSalaryTax;
                let salary = new Salary(grossSalary, employeeSocialContribution, employeeHealthContribution, employerSocialContribution, employerHealthContribution, tapSalaryTax, netSalary, totalExpense);
                console.log(salary);
                populateResults(salary);
                if (window.innerWidth < 500) {
                    populateMobileExpensesTable(salary);
                } else {
                    populateExpensesTable(salary);
                }
                populateTotal(salary);
            }
        }
    }
}