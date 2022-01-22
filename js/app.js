import * as jsonData from '../lang/lang.json';
console.log(jsonData);
import { appState } from './stateManager';
import { Salary } from './salary.js';
import { tap } from './tap.js';
import { netSalaryRate } from './netSalaryRate.js';
import { populateExpensesTable } from './generateTable.js';
import { populateMobileExpensesTable } from './generateMobileTable.js';
import { populateResults, populateTotal } from './salaryResult.js';

import { SalaryCalculator2021 } from './salaryCalculation';

const salaryCalculator2021 = new SalaryCalculator2021();

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

window.onkeydown = function (event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        return false;
    }
}


async function convertMoneyCurrency(fromCurrency, toCurrency) {
    fromCurrency = fromCurrency.toUpperCase();
    toCurrency = toCurrency.toUpperCase();
    let conversionCourse = await axios.get(`https://free.currconv.com/api/v7/convert?q=${fromCurrency}_${toCurrency}&compact=ultra&apiKey=17e0bf83ad97d32d9c38`);
    return conversionCourse.data[`${fromCurrency}_${toCurrency}`];
}

currency.onchange = function (event) {
    appState.setState('activeCurrency', event.target.value);
}

calculateNet.onclick = async function () {
    if(appState.activeCurrency != 'all') {
        if(appState.currencyRate[`${appState.activeCurrency}_all`] == null) {
            console.log('Call to service')
            appState.currencyRate[`${appState.activeCurrency}_all`] = await convertMoneyCurrency(appState.activeCurrency, 'all');
        }
    }

    grossSalary = appState.activeCurrency == 'all' ? parseInt(SalaryValue.value) : parseInt(SalaryValue.value) * appState.currencyRate[`${appState.activeCurrency}_all`];

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

        const netSalary = salaryCalculator2021.calculateNetSalary(grossSalary);
    console.log(netSalary);
        console.log(netSalary)
        populateResults(netSalary);
        if (window.innerWidth < 500) {
            populateMobileExpensesTable(netSalary);
        } else {
            populateExpensesTable(netSalary);
        }
        populateTotal(netSalary);
    }
}



calculateGross.onclick = async function () {
    
    // get Net Salary value
    if(appState.activeCurrency != 'all') {
        if(appState.currencyRate[`${appState.activeCurrency}_all`] == null) {
            console.log('Call to service')
            appState.currencyRate[`${appState.activeCurrency}_all`] = await convertMoneyCurrency(appState.activeCurrency, 'all');
        }
    }

    netSalary = appState.activeCurrency == 'all' ? parseInt(SalaryValue.value) : parseInt(SalaryValue.value) * appState.currencyRate[`${appState.activeCurrency}_all`];


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

        const grossSalary = salaryCalculator2021.calculateGrossSalary(netSalary);

        populateResults(grossSalary);
        if (window.innerWidth < 500) {
            populateMobileExpensesTable(grossSalary);
        } else {
            populateExpensesTable(grossSalary);
        }
        populateTotal(grossSalary);
    }
}

const salaryValueLabel = document.getElementsByName('SalaryValueLabel')[0];

headerPageName.innerHTML = jsonData[appState.getPropertyByKey('language')].header;
salaryValueLabel.innerHTML = jsonData[appState.getPropertyByKey('language')].salaryValueLabel;
SalaryValue.placeholder = jsonData[appState.getPropertyByKey('language')].salaryValueInput;
calculateNet.innerHTML = jsonData[appState.getPropertyByKey('language')].grossToNetButton;
calculateGross.innerHTML = jsonData[appState.getPropertyByKey('language')].netToGrossButton;

language.onchange = async function(event) {
    appState.setState('language', event.target.value);
    headerPageName.innerHTML = jsonData[appState.getPropertyByKey('language')].header;
    salaryValueLabel.innerHTML = jsonData[appState.getPropertyByKey('language')].salaryValueLabel;
    SalaryValue.placeholder = jsonData[appState.getPropertyByKey('language')].salaryValueInput;
    calculateNet.innerHTML = jsonData[appState.getPropertyByKey('language')].grossToNetButton;
    calculateGross.innerHTML = jsonData[appState.getPropertyByKey('language')].netToGrossButton;
    
    // TO DO: remove duplicated logic to update result table language
    // duplicated logic from on click
    {
        switch (appState.activeCurrency) {
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

// const getConversionRate = function (...currencies) {
//     currencies.forEach(currency => {
//         console.log(currency);
//     });
// }

// getConversionRate('all', 'eur', 'usd');