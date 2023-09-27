const numberButtons = document.querySelectorAll("button.number")
const screenDisplay = document.getElementById("display")
const clearButton = document.getElementById("clear")



console.log(numberButtons)

function clearDisplay() {
    screenDisplay.innerHTML = ""
}

function appendDisplay(num) {
    screenDisplay.innerHTML += num.innerHTML
    console.log(num.innerHTML)
}

numberButtons.forEach((numberButton) => { 
    numberButton.addEventListener("click", () => appendDisplay(numberButton))
})






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


document.addEventListener('keyup', (event) => {
        let appendedNum = parseFloat(event.key)
        if (isNaN(appendedNum)) {
           return
        }
        screenDisplay.innerHTML += appendedNum
    }
)

clearButton.addEventListener('click', ()=> clearDisplay())