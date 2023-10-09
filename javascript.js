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
        firstNumber = undefined;
        secondNumber = undefined;
        numString = undefined;
        maxDecimalPlaces = undefined;
        isNum = undefined; 
        operatorArr = [];
        operation = undefined;
});

//Arithmetic operations     

    //Create variables and functions to use in operate().
        let firstNumber;
        let secondNumber;

        const divide = (a, b) => a / b;
        const multiply = (a, b) => a * b;
        const subtract = (a, b) => a - b;
        const add = (a, b) => a + b;

    function operate(firstArg, operator, secondArg) {

        //Don't operate if no previous operation, because this runs every time an operator is pressed.
        if (firstArg === undefined) {
            return roundToEight(secondArg);
        }

        /*Don't operate if no new number entered in existing display, 
        because this runs every time an operator is pressed.*/
        if (secondArg === '0' || secondArg === '') {
            return roundToEight(firstArg);
        }

        //Make sure argument type is 'number.'
        firstNumber = Number(firstArg);
        secondNumber = Number(secondArg);

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
        let isNum; 

    function roundToEight(num) {
        
        isNum = Number(num); //Make sure argument type is 'number.'

        numString = num.toString(); //Make a string version to count how many places it has.

        if (numString.length > 8) {
            if (isNum > 99999999) {
                //Convert numbers that are too big to exponent format.
                return isNum.toExponential(2);
            } else {
                //Round decimals of numbers that don't need exponent format.
                maxDecimalPlaces = 8 - (numString.indexOf('.') + 1);
                if (maxDecimalPlaces < 0) {
                    return isNum.toFixed(0);    
                } else {
                    return isNum.toFixed(maxDecimalPlaces);
                }
            }
        } else {
            return isNum;
        }
    }

//Operation button functions    
    let operatorArr = []; //Store which operator buttons were pressed here. 
    let operation; //Store the output of the last operation here.

//Run operation when operator button is pressed.
    const operatorButtons = document.querySelectorAll('.operator');
    
    operatorButtons.forEach((operatorButton) => {
        operatorButton.addEventListener('click', () => {
            operatorArr.unshift(operatorButton.id); //Store which operator pressed
            operation = roundToEight(operate(operation, operatorArr[1], existingDisplay));
            display.textContent = operation;
            existingDisplay = '';
        });
    });

//Run operation when "=" button is pressed.    
    const equalsButton = document.querySelector('#equals');

    equalsButton.addEventListener('click', () => {
        operation = roundToEight(operate(operation, operatorArr[0], existingDisplay));
        display.textContent = operation;
        existingDisplay = '';
    });