let runningResult = 0
let buffer = '0'
let previousOperator = null
const screenContent = document.querySelector('.calc-screen')

const reRender = () => {
    screenContent.innerText = buffer
}

const performOperation = (value) => {
    value = Number(value)
    switch (previousOperator) {
        case "+":
            runningResult += value
            break;
        case "-":
            runningResult -= value
            break;
        case "×":
            runningResult *= value
            break;
        case "÷":
            runningResult /= value
            break;
        default:
            break;
    }
    runningResult = (runningResult % 1 !== 0) ? runningResult.toFixed(2) : runningResult
}

const handleMath = (value) => {
    if (runningResult === 0) {
        runningResult = Number(buffer)
    } else {
        performOperation(buffer)
    }
    previousOperator = value
    buffer = '0'
}

const handleSymbol = (value) => {
    switch (value) {
        case "C":
            buffer = '0'
            runningResult = 0
            break;
        case "=":
            if (previousOperator === null) {
                return
            } 
            performOperation(buffer)
            previousOperator = null
            buffer = '' + runningResult
            runningResult = 0
            break;
        case "←": 
            if (buffer.length === 1) {
                buffer = '0'
            } else {
                buffer = buffer.substring(0, buffer.length - 1)
            }
            break
        case ".": 
            if (buffer.length > 0 && !buffer.includes('.')) {
                buffer = buffer + '.'
            }
            break
        default:
            handleMath(value)
            break;
    }
}

const handleNumber = (value) => {
    if (buffer === '0') {
        buffer = value
    } else {
        buffer += value
    }
}

const buttonClick = (value) => {
    if (isNaN(Number(value))) {
        handleSymbol(value)
    } else {
        handleNumber(value)
    }
    reRender()
}

document.querySelector('.calc-buttons').addEventListener('click', (event) => {
    buttonClick(event.target.innerText)
})