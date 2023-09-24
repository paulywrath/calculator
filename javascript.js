let display = document.querySelector('#display');
let existingDisplay = display.textContent;
let updatedDisplay;

//Add which number button was pressed to the display.
    const numberButtons = document.querySelectorAll('.number');

    numberButtons.forEach((numberButton) => {

        numberButton.addEventListener('click', () => {
            updatedDisplay = existingDisplay + numberButton.id;
            existingDisplay = updatedDisplay;
            display.textContent = updatedDisplay;
        });
    });

let firstNumber;
let operator;
let secondNumber;

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function operate (firstNumber, operator, secondNumber) {
    switch (operator) {
        case '+':
            add(firstNumber, secondNumber);
            break;
        case '-':
            subtract(firstNumber, secondNumber);
            break;
        case '*':
            multiply(firstNumber, secondNumber);
            break;
        case '/':
            divide(firstNumber, secondNumber);
    }
}