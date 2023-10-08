//Node and variable for display
    const display = document.querySelector('#display');
    let existingDisplay = '';

//Add which number button was pressed to the display.
    const numberButtons = document.querySelectorAll('.number');

    numberButtons.forEach((numberButton) => {
        numberButton.addEventListener('click', () => {
            if (existingDisplay.length < 8) {
                existingDisplay += numberButton.id;
                display.textContent = existingDisplay;
            } 
        });
    });

//Clear entry from display
    const clearEntry = document.querySelector('#CE');

    clearEntry.addEventListener('click', () => {
        existingDisplay = '';
        display.textContent = existingDisplay;
    });

//All clear button function
    const allClear = document.querySelector('#AC');

    allClear.addEventListener('click', () => {
        existingDisplay = '';
        display.textContent = existingDisplay;
        operatorArr = [];
        operation = undefined;
});

//Arithmetic operations     
    const divide = (a, b) => a / b;
    const multiply = (a, b) => a * b;
    const subtract = (a, b) => a - b;
    const add = (a, b) => a + b;

    function operate(firstNumber, operator, secondNumber) {

        //Don't operate if no previous operation, because this runs every time an operator is pressed.
        if (firstNumber === undefined) {
            return secondNumber;
        }

        /*Don't operate if no new number entered in existing display, 
        because this runs every time an operator is pressed.*/
        if (secondNumber === 0) {
            return firstNumber;
        }

        //Operate if you have all operation variables.
        switch (operator) {
            case '/':
                return divide(firstNumber, secondNumber);
                break;
            case 'x':
                return multiply(firstNumber, secondNumber);
                break;
            case '-':
                return subtract(firstNumber, secondNumber);
                break;
            case '+':
                return add(firstNumber, secondNumber);            
        }
    }

//Don't let operation output exceed eight places, including decimal place.
    
    //Create variables to use in roundToEight().
        let numString;
        let maxDecimalPlaces; 

    function roundToEight(num) {
        
        //Make a string version to count how many places it has.
        numString = num.toString();
        
        if (numString.length > 8) {
            if (num > 99999999) {
                //Convert numbers that are too big to exponent format.
                return num.toExponential(2);
            } else {
                //Round decimals of numbers that don't need exponent format.
                maxDecimalPlaces = 8 - (numString.indexOf('.') + 1);
                return num.toFixed(maxDecimalPlaces);
            }
        } else {
            return num;
        }
    }

//Operation button functions    
    let operatorArr = []; //Store which operator buttons were pressed here. 
    let operation; //Store the output of the last operation here.

//Run operation when operator button is pressed.
    const operatorButtons = document.querySelectorAll('.operator');
    
    operatorButtons.forEach((operatorButton) => {
        operatorButton.addEventListener('click', () => {
            //Convert existingDisplay from a string to a number to do arithmetic. 
            existingDisplay = Number(existingDisplay); 

            operatorArr.unshift(operatorButton.id); //Store which operator pressed

            operation = roundToEight(operate(operation, operatorArr[1], existingDisplay));

            display.textContent = operation;

            existingDisplay = '';
        });
    });

//Run operation when "=" button is pressed.    
    const equalsButton = document.querySelector('#equals');

    equalsButton.addEventListener('click', () => {
        //Convert existingDisplay from a string to a number to do arithmetic. 
        existingDisplay = Number(existingDisplay);

        operation = roundToEight(operate(operation, operatorArr[0], existingDisplay));

        display.textContent = operation;

        existingDisplay = '';
    });