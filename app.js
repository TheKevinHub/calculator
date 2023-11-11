let operator = '';
let previousValue = '';
let currentValue = '';

document.addEventListener("DOMContentLoaded", function() {
    // Store all components on HTML in JS
    let clear = document.querySelector("#clear");
    let clearAll = document.querySelector("#clearAll");
    let equal = document.querySelector("#equal");
    let decimal = document.querySelector("#decimal");

    let numbers = document.querySelectorAll("#number");
    let operators = document.querySelectorAll("#operator");

    let previousScreen = document.querySelector(".previous");
    let currentScreen = document.querySelector(".current");

    numbers.forEach((number) => number.addEventListener("click", function(e) {
        handleNumber(e.target.textContent)
        currentScreen.textContent = currentValue;
    }))

    operators.forEach((op) => op.addEventListener("click", function(e) {
        handleOperator(e.target.textContent)
        previousScreen.textContent = previousValue + " " + operator;
        currentScreen.textContent = currentValue;
    }))

    clear.addEventListener("click", function() {
        currentValue = '';
        operator = '';
        currentScreen.textContent = '';
    })
    clearAll.addEventListener("click", function() {
        previousValue = '';
        currentValue = '';
        operator = '';
        previousScreen.textContent = '';
        currentScreen.textContent = '';
    })

    equal.addEventListener("click", function() {
        if (currentValue != '' && previousValue != '') {
            calculate();
            previousScreen.textContent = '';
            if (previousValue.length <= 5) {
                currentScreen.textContent = previousValue;
            }
            else {
                currentScreen.textContent = previousValue.slice(0,5) + "..."; // WIP
            }
        }        
    })

    decimal.addEventListener("click", function() {
        addDecimal();
    })
})

function handleNumber(num) {
    if (currentValue.length <= 27) {
        currentValue += num;
    }
}

function handleOperator(op) {
    operator = op;
    previousValue = currentValue;
    currentValue = '';
}

function calculate() {
    previousValue = Number(previousValue);
    currentValue = Number(currentValue);

    if (operator === "+") {
        previousValue += currentValue;
    }
    else if (operator === "-"){
        previousValue -= currentValue;
    }
    else if (operator === "X") {
        previousValue *= currentValue;
    }
    else if (operator === "÷") {
        previousValue /= currentValue;
    }
    // WIP - else if for the rest of the operators ' % | √ '

    previousValue = roundNumber(previousValue);
    previousValue = previousValue.toString();
    currentValue = previousValue.toString();
    console.log(previousValue);
}

function roundNumber(num) {
    return Math.round(num * 1000000) / 1000000;
}

function addDecimal() {
    if (!currentValue.includes(".")) {
        currentValue += ".";
    }
}