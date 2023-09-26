const display = document.querySelector('#display');
let existingDisplay = display.textContent;
//let updatedDisplay;

//Add which number button was pressed to the display.
    const numberButtons = document.querySelectorAll('.number');

    numberButtons.forEach((numberButton) => {

        numberButton.addEventListener('click', () => {
            //updatedDisplay = existingDisplay + numberButton.id;
            //existingDisplay = updatedDisplay;
            if (existingDisplay.length < 8) {
                existingDisplay += numberButton.id;
                display.textContent = existingDisplay;
            } 
        });
    });

let firstNumber;
let operator;
let secondNumber;

const divide = (a, b) => a / b;
const multiply = (a, b) => a * b;
const subtract = (a, b) => a - b;
const add = (a, b) => a + b;

function operate(firstNumber, operator, secondNumber) {
    //Don't operate if no previous operation, because this runs every time an operator is pressed.
    if (firstNumber === undefined) {
        return secondNumber;
    }
    //Operate if you have all operation variables.
    switch (operator) {
        case '/':
            return divide(firstNumber, secondNumber);
            break;
        case 'x':
            return multiply(firstNumber, secondNumber)
            break;
        case '-':
            return subtract(firstNumber, secondNumber);
            break;
        case '+':
            return add(firstNumber, secondNumber);            
    }
}

//Round decimals
function roundNumber(num, dec) {
    return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
  }

let operatorArr = []; //Store which operator buttons were pressed here. 
let operation; //Store the output of the last operation here.

//Run operation when operator button is pressed.
    const operatorButtons = document.querySelectorAll('.operator');

    operatorButtons.forEach((operatorButton) => {

        operatorButton.addEventListener('click', () => {
            existingDisplay = Number(existingDisplay);
            operatorArr.unshift(operatorButton.id); //Store which operator pressed
            operation = operate(operation, operatorArr[1], existingDisplay);
            operation = roundNumber(operation, 6);
            display.textContent = operation;
            existingDisplay = '';
        });
    });

//Run operation when "=" button is pressed.    
    const equalsButton = document.querySelector('#equals');

    equalsButton.addEventListener('click', () => {
        existingDisplay = Number(existingDisplay);
        operation = operate(operation, operatorArr[0], existingDisplay);
        operation = roundNumber(operation, 6);
        display.textContent = operation;
        existingDisplay = '';
    });