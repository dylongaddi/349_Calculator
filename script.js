const numberButtons = document.querySelectorAll("button.number")
const currScreenDisplay = document.getElementById("currScreenDisplay")
const storedScreenDisplay = document.getElementById("storedScreenDisplay")
const clearButton = document.getElementById("clear")
const equalsButton = document.getElementById("equals")
const deleteButton = document.getElementById("delete")
const operatorButtons = document.querySelectorAll("button.operator")
const decimalPointButton = document.getElementById("decimalPoint")

let storedNums = []
let operator = null
let isOperating = false

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
}

function getFirstNum() {
    return parseFloat(currScreenDisplay.innerHTML)
}

function getSecondNum() {
    if (!operator || storedNums.length < 1) {
        return
    } else {
        const currNums = currScreenDisplay.innerHTML
        let secondNumIndex = (storedNums[0]).toString().length + 1
        const secondNum = currNums.substring(secondNumIndex)
        if (isNaN(parseFloat(secondNum))) {
            return
        }
        return parseFloat(secondNum)
    }
}

function clearStoredNums() {
    storedNums = []
}

function backspaceDisplay() {
    if (currScreenDisplay.innerHTML == "Undefined") {
        clearDisplay()
        return
    }
    const currLen = currScreenDisplay.innerHTML.toString().length
    let storedLen
    if (storedNums[0]) {
        storedLen = storedNums[0].toString().length
    }

    if (storedScreenDisplay.innerHTML == '0') {
        return
    } else if (storedScreenDisplay.innerHTML.length == 1) {
        storedScreenDisplay.innerHTML = '0'
        currScreenDisplay.innerHTML = '0'
    } else {
        storedScreenDisplay.innerHTML = storedScreenDisplay.innerHTML.slice(0, -1)
        currScreenDisplay.innerHTML = currScreenDisplay.innerHTML.slice(0, -1) 
    }
    
    if (currScreenDisplay.innerHTML != currLen < storedLen) {
        storedNums[0] = parseFloat(currScreenDisplay.innerHTML)
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
    if (storedNums.length == 2) {
        return
    } else if (storedNums.length == 0) {
        storedNums[0] = parseFloat(num)
    } else if (storedNums.length == 1) {
        storedNums[1] = parseFloat(num)
    }
}

function setOperator(operatorButton) {
    switch (operatorButton) {
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
    if (operator && (!isNaN(storedNums[1]))) {
        const answer = operator(parseFloat(storedNums[0]), parseFloat(storedNums[1]))
        const stored = storedScreenDisplay.innerHTML
        clearDisplay()
        if (stored == currScreenDisplay.innerHTML) {
            storedScreenDisplay.innerHTML = stored
            currScreenDisplay.innerHTML = answer
        } else {
            storedScreenDisplay.innerHTML = answer
            currScreenDisplay.innerHTML = answer
        }
        storedNums = [answer]
        operator = null
    } else  {
        return
    }
}

numberButtons.forEach((numberButton) => { 
    numberButton.addEventListener("click", () => appendDisplay(numberButton.innerHTML))
})

operatorButtons.forEach((operatorButton) => {
    operatorButton.addEventListener("click", () => {
        const currScreen = currScreenDisplay.innerHTML
        if (currScreen == '0') {
            return
        }
        const num1 = getFirstNum()
        if (getSecondNum()) {
            return
        }

        if (operator && currScreen.length == (num1.toString().length+1)) {
            backspaceDisplay()
            appendDisplay(operatorButton.innerHTML)
            setOperator(operatorButton.innerHTML)
        } else if (operator) {
            appendDisplay(operatorButton.innerHTML)
            setOperator(operatorButton.innerHTML)
        }
        if (!operator && (currScreen != '0' || currScreen != "")) {
            setOperator(operatorButton.innerHTML)
            appendDisplay(operatorButton.innerHTML)
            if (storedNums.length == 0) {
                appendStoredNums(num1)
            } else if (storedNums.length == 1) {
                storedNums[0] = num1
            }
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
    if (event.key == "Backspace") {
        backspaceDisplay()
    }
})

document.addEventListener("keyup", (event) => { //event listener for backspace
    if (event.key == '.') {
        const text = currScreenDisplay.innerHTML.toString()
        if (!(text.includes('.'))) {
            appendDisplay('.')
        } else if (text.includes('.') && operator) {
            appendDisplay('.')
        }
    }
})

document.addEventListener("keyup", (event) => { //event listener for backspace
    if ((event.key == '+') || (event.key == '-') || (event.key == 'x') || (event.key == '/')) {
        const currScreen = currScreenDisplay.innerHTML
        if (currScreenDisplay.innerHTML == '0') {
            return
        }
        const num1 = getFirstNum()
        if (getSecondNum()) {
            return
        }

        if (operator && currScreen.length == (num1.toString().length+1)) {
            backspaceDisplay()
            appendDisplay(event.key)
            setOperator(event.key)
        } else if (operator) {
            appendDisplay(event.key)
            setOperator(event.key)
        }

        if ((!operator) && (currScreen != '0' || currScreen != "")) {
            setOperator(event.key)
            appendDisplay(event.key)
            if (storedNums.length == 0) {
                appendStoredNums(num1)
            } else if (storedNums.length == 1) {
                storedNums[0] = num1
            }
        }
    }
})

document.addEventListener("keyup", (event)=> {
    if (event.key == "Enter") {
        if (!operator) {
            return
        }
        let num2 = getSecondNum()
        appendStoredNums(num2)
        getAnswer()  
    }
})

deleteButton.addEventListener("click", ()=> backspaceDisplay())

clearButton.addEventListener("click", ()=> clearDisplay())

decimalPointButton.addEventListener("click", ()=> {
    const text = currScreenDisplay.innerHTML.toString()
    let counter = 0
    if (!(text.includes('.'))) {
        appendDisplay('.')
        counter++
    } else if (text.includes('.') && operator && counter < 2) {
        appendDisplay('.')
        counter++
    }
})

equalsButton.addEventListener("click", ()=> {
    if (!operator) {
        return
    }
    let num2 = getSecondNum()
    appendStoredNums(num2)
    getAnswer()
})
