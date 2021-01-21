const numbers = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll('.operators');
const misc = document.querySelectorAll('.misc');
const input = document.querySelector('.input');
const output = document.querySelector('.output');

const operationArray = ['first', 'operator', 'second'];
// insert digits in input field
numbers.forEach(number => {
    number.addEventListener('click', e => {
        e.stopPropagation;
        const digit = Number(e.target.textContent);
        limitMaxInput();
        input.value += digit;
    
    })
});
//delete digit and clear
misc.forEach(miscs => {
    miscs.addEventListener('click', e => {
        e.stopPropagation;

        //delete
        if (e.target.classList.contains('delete')) {
            const value = input.value;
            input.value = value.slice(0, -1);
        } 
        
        //clear
        else if (e.target.classList.contains('clear')) {
            input.value = '';
            output.value = '';
            operationArray[0] = 'first';
            operationArray[2] = 'second';
        } 
        
        //equals
        else if (e.target.classList.contains('equals')) {
            perform();
        } 
        
        //decimal
        else if (e.target.classList.contains('decimal')){
            if (!(input.value.includes('.'))){
                input.value += '.';
            }
            
        } 
        
        //percent
        else if (e.target.classList.contains('percent')){
            if (input.value != ''){
                const percentage = Number(input.value) / 100 ;
                input.value = percentage;
            } else {
                const percentage = Number(output.value) / 100 ;
                output.value = percentage;
                operationArray[0] = output.value;
            }
        }
        //square
        else if (e.target.classList.contains('square')){
            if (input.value != ''){
            const square = Number(input.value) * Number(input.value);
            input.value = square; }
        } 
        else if (e.target.classList.contains('sqrt')){
            if (input.value != ''){
            const sqrt= Number(input.value) ** (1/2);
            input.value = sqrt.toPrecision(5);
            }}
        }
    )
});
//perform operations
operators.forEach(item => {
    item.addEventListener('click', e => {
        e.stopPropagation;
        console.log(operationArray);
        if (e.target.classList.contains('add')) {
            if(operationArray[0] === 'first'){
            operationArray[0] = input.value;
            operationArray[1] = addition;
            output.value = operationArray[0];
            input.value = '';
            } else {
                perform();
                operationArray[1] = addition;
            }
        } 
        
        else if (e.target.classList.contains('multiply')) {
            if(operationArray[0] === 'first'){
                operationArray[0] = input.value;
                operationArray[1] = multiplication;
                output.value = operationArray[0];
                input.value = '';

                } else {
                    perform();
                    operationArray[1] = multiplication;
                }
        }

        else if (e.target.classList.contains('subtract')) {
            if(operationArray[0] === 'first'){
                operationArray[0] = input.value;
                operationArray[1] = subtraction;
                output.value = operationArray[0];
                input.value = '';
          } else {
            perform();
            operationArray[1] = subtraction;
                }
        }

        else if (e.target.classList.contains('divide')) {
            if(operationArray[0] === 'first'){
                operationArray[0] = input.value;
                operationArray[1] = division;
                output.value = operationArray[0];
                input.value = '';
                } else {
                    perform();
                    operationArray[1] = division;
                }
        }

       

    })
})





// take an operator and two numbers to perform an operation
function perform() {
    if (operationArray[0] === 'first') {
        operationArray[0] = input.value;
        output.value = operationArray[0];
    } else if (input.value != '') {
        operationArray[2] = input.value;
        const calculatedValue = operate(operationArray[1], Number(operationArray[0]), Number(operationArray[2])); 
        output.value = calculatedValue.toPrecision(5) ;
        operationArray[0] = calculatedValue;
        input.value = '';
    }
}

//operations
const addition = function add(x, y) {
    return x + y;
}

const subtraction = function subtract(x, y) {
    return x - y;
}
const multiplication = function multiply(x, y) {
    return x * y;
}
const division = function divide(x, y) {
    return x / y;
}

function operate(operator, x, y) {
    return operator(x, y);
}

//constraints
function limitMaxInput() {
    if (input.value.length == '7') {
        input.value = input.value.slice(1);
    }
}