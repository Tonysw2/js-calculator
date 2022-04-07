'use strict';

// ELEMENTS
const containerEl = document.querySelector('.container ');
const btnWrapEl = document.querySelector('.btn-wrap');
const btnNumEl = document.querySelectorAll('.num');
const calculatorEL = document.querySelector('.calculator');
const displayEl = document.querySelector('.display');
const prevDisplayEl = document.querySelector('.prev-display');
const operatorsEl = document.querySelectorAll('.operator');
const numEl = document.querySelectorAll('num');
const equalEl = document.getElementById('equals');
const cleanEl = document.getElementById('clean');
const deleteEl = document.getElementById('delete');

let currentNum = '';
let prevNum = '';
let operator = '';
let result = '';

// HELPER FUNCTIONS
const updateDisplay = function () {
    prevDisplayEl.textContent = prevNum + operator;
    currentNum === ''
        ? (displayEl.textContent = '0')
        : (displayEl.textContent = currentNum);
};

const cleanCalc = function () {
    currentNum = '';
    prevNum = '';
    operator = '';

    updateDisplay();
};

const del = function () {
    if (currentNum.length > 0) {
        currentNum = currentNum.slice(0, -1);
        updateDisplay();
    }

    if (currentNum.length === 0) {
        currentNum = '';
        updateDisplay();
    }
};

const appendNum = function (number) {
    currentNum += number;
    updateDisplay();
};

const compute = function () {
    if (operator === '+') {
        result = parseFloat(prevNum) + parseFloat(currentNum);
    }

    if (operator === '-') {
        result = parseFloat(prevNum) - parseFloat(currentNum);
    }

    if (operator === '/') {
        result = parseFloat(prevNum) / parseFloat(currentNum);
    }

    if (operator === 'x') {
        result = parseFloat(prevNum) * parseFloat(currentNum);
    }

    currentNum = result.toString();
    prevNum = '';
    operator = '';

    updateDisplay();
};

// EVENT LISTENERS
btnNumEl.forEach((btn) => {
    btn.addEventListener('click', function (event) {
        // avoid bug when user has already clicked on dot
        if (currentNum.includes('.') && event.target.innerText === '.') return;
        // avoid number higher then 10
        if (currentNum.length === 10) return;

        appendNum(event.target.innerText);
    });
});

operatorsEl.forEach((button) => {
    button.addEventListener('click', function (e) {
        if (operator !== '' && currentNum !== '') compute();

        // prevent a NAN bug when click in operator multiple times
        if (operator !== '' && currentNum === '') return;

        operator = e.target.innerText;
        prevNum = currentNum;

        updateDisplay();
        currentNum = '';
        displayEl.textContent = '0';
    });
});

clean.addEventListener('click', cleanCalc);
deleteEl.addEventListener('click', del);

equalEl.addEventListener('click', function () {
    compute();
    currentNum = '';
});
