import * as jsonData from '../lang/lang.json';
import { appState } from './stateManager';
import { populateExpensesTable } from './generateTable.js';
import { populateMobileExpensesTable } from './generateMobileTable.js';
import { populateResults, populateTotal } from './salaryResult.js';

import { SalaryCalculator2021 } from './salaryCalculation';

const salaryCalculator2021 = new SalaryCalculator2021();

const minSalary = 30000; //26000
const minNetSalary = 26640; //23088
let grossSalary;
let netSalary;

window.onkeydown = function (event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        return false;
    }
}


async function convertMoneyCurrency(fromCurrency, toCurrency) {
    fromCurrency = fromCurrency.toUpperCase();
    toCurrency = toCurrency.toUpperCase();
    let conversionCourse = await axios.get(`https://free.currconv.com/api/v7/convert?q=${fromCurrency}_${toCurrency}&compact=ultra&apiKey=3f870f6b709b1022771c`);
    return conversionCourse.data[`${fromCurrency}_${toCurrency}`];
}

currency.onchange = function (event) {
    appState.setState('activeCurrency', event.target.value);
}

const handleGrossToNet = async function() {
    if(appState.activeCurrency != 'all') {
        if(appState.currencyRate[`${appState.activeCurrency}_all`] == null) {
            appState.currencyRate[`${appState.activeCurrency}_all`] = await convertMoneyCurrency(appState.activeCurrency, 'all');
        }
    }

    grossSalary = appState.activeCurrency == 'all' ? parseInt(SalaryValue.value) : parseInt(SalaryValue.value) * appState.currencyRate[`${appState.activeCurrency}_all`];

    if (isNaN(grossSalary)) {
        document.querySelectorAll('#allResults')[0].style.display = 'none';
        document.querySelectorAll('#message')[0].style.display = 'block';
        message.innerHTML = `<div class="message error">${jsonData[appState.getPropertyByKey('language')].emptySalaryError}!</div>`;
    } else if (grossSalary < minSalary) {
        document.querySelectorAll('#allResults')[0].style.display = 'none';
        document.querySelectorAll('#message')[0].style.display = 'block';
        message.innerHTML = `<div class="message error">${jsonData[appState.getPropertyByKey('language')].lowerThanMinSalaryError}!</div>`;
    } else {
        document.querySelectorAll('#message')[0].style.display = 'none';
        document.querySelectorAll('#allResults')[0].style.display = 'block';

        const netSalary = salaryCalculator2021.calculateNetSalary(grossSalary);

        populateResults(netSalary);
        if (window.innerWidth < 500) {
            populateMobileExpensesTable(netSalary);
        } else {
            populateExpensesTable(netSalary);
        }
        populateTotal(netSalary);
    }
}

calculateNet.onclick = async function() {
    appState.setState('currentCalculation', 'grossToNet');
    await handleGrossToNet();
}

const handleNetToGross = async function() {
    // get Net Salary value
    if(appState.activeCurrency != 'all') {
        if(appState.currencyRate[`${appState.activeCurrency}_all`] == null) {
            appState.currencyRate[`${appState.activeCurrency}_all`] = await convertMoneyCurrency(appState.activeCurrency, 'all');
        }
    }

    netSalary = appState.activeCurrency == 'all' ? parseInt(SalaryValue.value) : parseInt(SalaryValue.value) * appState.currencyRate[`${appState.activeCurrency}_all`];


    if (isNaN(netSalary)) {
        document.querySelectorAll('#allResults')[0].style.display = 'none';
        document.querySelectorAll('#message')[0].style.display = 'block';
        message.innerHTML = `<div class="message error">${jsonData[appState.getPropertyByKey('language')].emptySalaryError}!</div>`;
    } else if (netSalary < minNetSalary) {
        document.querySelectorAll('#allResults')[0].style.display = 'none';
        document.querySelectorAll('#message')[0].style.display = 'block';
        message.innerHTML = `<div class="message error">${jsonData[appState.getPropertyByKey('language')].lowerThanMinSalaryError}!</div>`;
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

calculateGross.onclick = async function() {
    appState.setState('currentCalculation', 'netToGross');
    await handleNetToGross();
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
    
    if(appState.getPropertyByKey('currentCalculation') == 'netToGross')
        await handleNetToGross();
    else
        await handleGrossToNet();

}