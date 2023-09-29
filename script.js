const numberButtons = document.querySelectorAll("button.number")
const currScreenDisplay = document.getElementById("currScreenDisplay")
const storedScreenDisplay = document.getElementById("storedScreenDisplay")
const clearButton = document.getElementById("clear")
const equalsButton = document.getElementById("equals")
const deleteButton = document.getElementById("delete")
const operatorButtons = document.querySelectorAll("button.operator")

let storedNums = []
let operator = null
let isOperating = false
let isEqualing = false

function add(num1, num2) {
    return (num1 + num2)
}

function subtract(num1, num2) {
    return (num1 - num2)
}

function multiply(num1, num2) {
    return (num1 * num2)
}

function divide(num1, num2) {
    if (num2 == 0) {
        console.log("Error cannot divide by zero")
        return "Undefined"
    } else {
        return (num1 / num2)
    }
}

function clearDisplay() {
    storedScreenDisplay.innerHTML = "0"
    currScreenDisplay.innerHTML = "0"
    storedNums = []
    operator = null
    isEqualing = false
}

function getFirstNum() {
    return parseFloat(currScreenDisplay.innerHTML)
}

function getSecondNum() {
    if (!operator) {
        return
    } else {
        const currNums = currScreenDisplay.innerHTML
        let secondNumIndex = (storedNums[0]).toString().length + 1
        const secondNum = currNums.substring(secondNumIndex)
        return parseFloat(secondNum)
    }
}

function clearStoredNums() {
    storedNums = []
}

function backspaceDisplay() {
    if (storedScreenDisplay.innerHTML == '0') {
        return
    } else if (storedScreenDisplay.innerHTML.length == 1) {
        storedScreenDisplay.innerHTML = '0'
        currScreenDisplay.innerHTML = '0'
    } else {
        storedScreenDisplay.innerHTML = storedScreenDisplay.innerHTML.slice(0, -1)
        currScreenDisplay.innerHTML = currScreenDisplay.innerHTML.slice(0, -1) 
    }
}

function appendDisplay(key) {
    if (currScreenDisplay.innerHTML == '0') {
        currScreenDisplay.innerHTML = ""
        storedScreenDisplay.innerHTML = ""
    }
    currScreenDisplay.innerHTML += key
    storedScreenDisplay.innerHTML += key
}

function appendStoredNums(num) {
        storedNums.push(num)
}

function setOperator(operatorButton) {
    switch (operatorButton.innerHTML) {
        case '+':
            operator = add
            break
        case '-':
            operator = subtract
            break
        case 'x':
            operator = multiply
            break
        case "/":
            operator = divide
            break
        default:
            operator = null
    }
}

function getAnswer() {
    if (operator && storedNums.length == 2) {
        const answer = operator(storedNums[0], storedNums[1])
        clearDisplay()
        appendDisplay(answer)
        storedNums = []
        operator = null
    }
}

numberButtons.forEach((numberButton) => { 
    numberButton.addEventListener("click", () => appendDisplay(numberButton.innerHTML))
})

operatorButtons.forEach((operatorButton) => {
    operatorButton.addEventListener("click", () => {
        if (storedNums.length == 1) {

        }
        if (operator) {
            backspaceDisplay()
            appendDisplay(operatorButton.innerHTML)
            setOperator(operatorButton)
        }
        if (!operator) {
            setOperator(operatorButton)
            appendDisplay(operatorButton.innerHTML)
            let num1 = getFirstNum()
            appendStoredNums(num1)
        }
    })
})

document.addEventListener('keyup', (event) => { //event listener for keyboard presses
    let appendedNum = parseFloat(event.key)
    if (isNaN(appendedNum)) {
        return
    }
    appendDisplay(event.key)
})

document.addEventListener("keyup", (event) => { //event listener for backspace
    if ((event.key == 8) || (event.code == "Backspace")) {
        console.log("backspace")
        backspaceDisplay()
        console.log(operator)
    }
})

clearButton.addEventListener("click", ()=> {
    clearDisplay()
    clearStoredNums()
})

equalsButton.addEventListener("click", ()=> {
    if (!operator) {
        return
    }
    let num2 = getSecondNum()
    appendStoredNums(num2)
    appendDisplay("=")
    getAnswer()   
})