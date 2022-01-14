function operate(operator, num1, num2) {
  num1 = parseInt(num1);
  num2 = parseInt(num2);
  if (operator == '+') {
    return num1 + num2;
  } else if (operator == '-') {
    return num1 - num2;
  } else if (operator == 'x') {
    return num1 * num2;
  } else if (operator == '/') {
    return num1 / num2;
  }
}

function processNumber(number) {
  // first let's see what's in the calculator already
  let displayedLine = document.querySelector('.calculator-display')

  // we have to clear the display line if the last button pressed was an operator
  if (operatorList.includes(lastButtonPressed) && operationHasOccurred === false) {
    displayedLine.textContent = "0";
  }

  if (operationHasOccurred === true && !operatorList.includes(lastButtonPressed)) {
    operationHasOccurred = false;
    displayedLine.textContent = "0";
    operatorPressedPrior = "";
  }

  // replace conditionally
  if (displayedLine.textContent === "0") {
    displayedLine.textContent = number;
  } else if (displayedLine.textContent.length > 8) {
    displayedLine.textContent = displayedLine.textContent
  } else {
    displayedLine.textContent = displayedLine.textContent + number;
  }

  lastButtonPressed = number;
}

function processPeriod() {
  // first let's see what's in the calculator already
  let displayedLine = document.querySelector('.calculator-display');
  if (!displayedLine.textContent.includes(".")) {
    displayedLine.textContent = displayedLine.textContent + ".";
  }
  lastButtonPressed = "."
}

function processDelete() {
  let displayedLine = document.querySelector('.calculator-display');
  if (displayedLine.textContent.length > 1) {
    displayedLine.textContent = displayedLine.textContent.slice(0, displayedLine.textContent.length-1);
  } else {
    displayedLine.textContent = '0';
  }
  lastButtonPressed = "del"
}

function processClear() {
  let displayedLine = document.querySelector('.calculator-display');
  displayedLine.textContent = "0";
  operatorPressedPrior = "";
  lastButtonPressed = "C"
}

function processOperator(button) {
  let displayedLine = document.querySelector('.calculator-display');
  if (operatorList.includes(lastButtonPressed)) {
    displayedLine.textContent = displayedLine.textContent;
    lastButtonPressed = button;
    operatorPressedPrior = button;
  } else if (operatorPressedPrior === "") {
    priorNumber = displayedLine.textContent;
    lastButtonPressed = button;
    operatorPressedPrior = button;
  } else {
    resultOfOperation = operate(operatorPressedPrior, priorNumber, displayedLine.textContent);
    priorNumber = resultOfOperation; //this is the new prior number
    displayedLine.textContent = resultOfOperation;
    operationHasOccurred = true;
    lastButtonPressed = button;
    operatorPressedPrior = button;
  }
}

function processEqual() {
  if (operatorPressedPrior === "") {
    displayedLine.textContent = displayedLine.textContent;
    lastButtonPressed = "="
  } else {
    resultOfOperation = operate(operatorPressedPrior, priorNumber, displayedLine.textContent);
    priorNumber = resultOfOperation; //this is the new prior number
    displayedLine.textContent = resultOfOperation;
    operationHasOccurred = true;
    lastButtonPressed = "=";
    operatorPressedPrior = "";
  }
}

let operationHasOccurred = false;
let resultOfOperation = "";
let priorNumber = "";
let operatorList = ['+', '-', 'x', '/'];
let lastButtonPressed = "";
let operatorPressedPrior = "";
let allNumButtons = document.querySelectorAll('.number-button');
let allSpecButtons = document.querySelectorAll('.special-button');

// create the default text in the calculator
let displayedLine = document.createElement('h3');
displayedLine.textContent = '0';
displayedLine.classList.add('calculator-display');

// and then add it in.
let displayLineContainer = document.querySelector('.display-line')
displayLineContainer.appendChild(displayedLine);

// adding mouseover effect
allNumButtons.forEach((button) => {
  button.addEventListener('mouseover', () => {
    button.style.backgroundImage = 'linear-gradient(lightgreen, white)'
  })
})

allNumButtons.forEach((button) => {
  button.addEventListener('mouseleave', () => {
    button.style.backgroundImage = 'linear-gradient(lightblue, white)';
  })
})

allSpecButtons.forEach((button) => {
  button.addEventListener('mouseover', () => {
    button.style.backgroundImage = 'linear-gradient(lightgreen, white)'
  })
})

allSpecButtons.forEach((button) => {
  button.addEventListener('mouseleave', () => {
    button.style.backgroundImage = 'linear-gradient(lightblue, white)'
  })
})


// update display when BUTTONS are pressed
allNumButtons.forEach((button) => {
  button.addEventListener('click', () => {
    let numberSelection = button.textContent;
    processNumber(numberSelection);
  })
})

allSpecButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (button.textContent == ".") {
      processPeriod();
    }
    if (button.textContent == "del") {
      processDelete();
    }
    if (button.textContent == "C" || button.textContent == "AC") {
      processClear();
    }
    if (operatorList.includes(button.textContent)) {
      processOperator(button.textContent);
    }
    if (button.textContent == "=") {
      processEqual();
    }
  })
})

