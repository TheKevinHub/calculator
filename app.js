let operandOne = ''
let operandTwo = ''
let currentOperation = null
let shouldResetScreen = false

const clearBtn = document.querySelector("#clear");
const clearAllBtn = document.querySelector("#clearAll");
const equalBtn = document.querySelector("#equal");
const decimalBtn = document.querySelector("#decimal");
const numbers = document.querySelectorAll("#number");
const operators = document.querySelectorAll("#operator");
const previousScreen = document.querySelector(".previous");
const currentScreen = document.querySelector(".current");
const signBtn = document.querySelector("#sign");

window.addEventListener('keydown', handleKeyboardInput)
equalBtn.addEventListener('click', evaluate)
clearBtn.addEventListener('click', deleteNumber)
clearAllBtn.addEventListener('click', clear)
decimalBtn.addEventListener('click', appendDecimal)
signBtn.addEventListener('click', switchSign)


numbers.forEach((button) => {
    button.addEventListener('click', () => appendNumber(button.textContent))
})

operators.forEach((button) => {
    button.addEventListener('click', () => setOperation(button.textContent))
})

function appendNumber(number) {
    if (currentScreen.textContent === '0' || shouldResetScreen) {
        resetScreen();
    }
    currentScreen.textContent += number;
}

function resetScreen() {
    currentScreen.textContent = ''
    shouldResetScreen = false
}

function clear() {
    currentScreen.textContent = '0'
    previousScreen.textContent = ''
    operandOne = ''
    operandTwo = ''
    currentOperation = null
}

function appendDecimal() {
    if (shouldResetScreen) { resetScreen() }
    if (currentScreen.textContent === '') {
        currentScreen.textContent = '0'
    }
    if (currentScreen.textContent.includes('.')) { return }
    currentScreen.textContent += '.'
}

function switchSign() {
    let a = Number(currentScreen.textContent)
    currentScreen.textContent = a * -1
}

function deleteNumber() {
    currentScreen.textContent = currentScreen.textContent.toString().slice(0, -1)
}

function setOperation(operator) {
    if (currentOperation !== null) {
        evaluate()
    }
    operandOne = currentScreen.textContent
    currentOperation = operator
    previousScreen.textContent = `${operandOne} ${currentOperation}`
    shouldResetScreen = true
}

function evaluate() {
    if (currentOperation === null || shouldResetScreen) {
        if (currentOperation === '%') {
            let a = Number(currentScreen.textContent)
            currentScreen.textContent = percent(a)
        }
        return
    }
    if (currentOperation === '÷' && currentScreen.textContent === '0') {
        alert("You can't divide by 0 silly human.")
        return
    }
    operandTwo = currentScreen.textContent
    currentScreen.textContent = roundResult(operate(currentOperation, operandOne, operandTwo))
    previousScreen.textContent = `${operandOne} ${currentOperation} ${operandTwo}`
    currentOperation = null
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000
}

function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) {appendNumber(e.key)}
    if (e.key == '.') { appendDecimal() }
    if (e.key === '=' || e.key === 'Enter') { evaluate() }
    if (e.key === 'Backspace') { deleteNumber() }
    if (e.key === 'Escape') { clear() }
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        setOperation(convertOperator(e.key))
    }
}

function convertOperator(keyboardOperator) {
    if (keyboardOperator === '/') { return '÷' }
    if (keyboardOperator === '*') { return '×' }
    if (keyboardOperator === '-') { return '−' }
    if (keyboardOperator === '+') { return '+' }
}

function add(a, b) {
    return a + b
}

function substract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    return a / b
}

function squareRoot(a, b) {
    return a * Math.sqrt(b)
}

function percent(a) {
    return a / 100
}

function operate(operator, a, b) {
    a = Number(a)
    b = Number(b)
    switch (operator) {
        case '+':
            return add(a, b)
        case '−':
            return substract(a, b)
        case '×':
            return multiply(a, b)
        case '÷':
            if (b === 0) {return null}
            else return divide(a, b)
        case '√':
            return squareRoot(a, b)
        default:
            return null
    }
}

// Thank you to michalosman. I needed to fix my 'C' button and instead I reworked the entire .js code