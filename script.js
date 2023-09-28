const numberButtons = document.querySelectorAll("button.number")
const currScreenDisplay = document.getElementById("currScreenDisplay")
const storedScreenDisplay = document.getElementById("storedScreenDisplay")
const clearButton = document.getElementById("clear")
let storedNums = []

console.log(numberButtons)

function clearDisplay() {
    storedScreenDisplay.innerHTML = "0"
    currScreenDisplay.innerHTML = "0"
    storedNums = []
}

function appendDisplay(num) {
    if (currScreenDisplay.innerHTML == 0) {
        currScreenDisplay.innerHTML = ""
    }
    currScreenDisplay.innerHTML += num.innerHTML
    if (storedNums.length == 0) {
        storedScreenDisplay.innerHTML = currScreenDisplay.innerHTML
    }
}

function appendStoredNums() {
    currScreenDisplay.innerHTML
    storedNums.push(currScreenDisplay.innerHTML)
}



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

numberButtons.forEach((numberButton) => { 
    numberButton.addEventListener("click", () => appendDisplay(numberButton))
})

document.addEventListener('keyup', (event) => { //event listener for keyboard presses
        let appendedNum = parseFloat(event.key)
        if (isNaN(appendedNum)) {
           return
        }
        if (currScreenDisplay.innerHTML == 0) {
            currScreenDisplay.innerHTML = ""
        }
        currScreenDisplay.innerHTML += appendedNum
        if (storedNums.length == 0) {
            storedScreenDisplay.innerHTML = currScreenDisplay.innerHTML
        }
    }
)

clearButton.addEventListener('click', ()=> clearDisplay())