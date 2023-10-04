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

        /*Delete these if I end up not using these variables.
        firstNumber = '';
        operator = '';
        secondNumber = '';
        */
    });

//Arithmetic operations     

    /*I'm not actually using these three variables. Should I be? Can I delete them?
    let firstNumber;
    let operator;
    let secondNumber;
    */

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
        if (secondNumber === '') {
            return firstNumber;
        }

        //Convert existingDisplay from a string to a number to do arithmetic. 
        secondNumber = Number(secondNumber);

        //Operate if you have all operation variables.
        switch (operator) {
            case '/':
                if (secondNumber === 0) {
                    return 'LOL NO'; 
                } else {
                    return divide(firstNumber, secondNumber);
                }
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

//Round decimals to six places.
    function roundToSix(num) {
    return +(Math.round(num + "e+6") + "e-6");
    }

//Operation button functions    
    let operatorArr = []; //Store which operator buttons were pressed here. 
    let operation; //Store the output of the last operation here.

    //Run operation when operator button is pressed.
        const operatorButtons = document.querySelectorAll('.operator');

        operatorButtons.forEach((operatorButton) => {

            operatorButton.addEventListener('click', () => {
                operatorArr.unshift(operatorButton.id); //Store which operator pressed
                //operation = roundToSix(operate(operation, operatorArr[1], existingDisplay));
                operation = operate(operation, operatorArr[1], existingDisplay);
                display.textContent = operation;
                existingDisplay = '';
            });
        });

    //Run operation when "=" button is pressed.    
        const equalsButton = document.querySelector('#equals');

        equalsButton.addEventListener('click', () => {            
            //operation = roundToSix(operate(operation, operatorArr[0], existingDisplay));
            operation = operate(operation, operatorArr[0], existingDisplay);
            display.textContent = operation;
            existingDisplay = '';
        });