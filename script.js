function operate(operator, num1, num2) {
  num1 = parseInt(num1);
  num2 = parseInt(num2);
  if (operator == '+') {
    return num1 + num2;
  } else if (operator == '-') {
    return num1 - num2;
  } else if (operator == '*') {
    return num1 * num2;
  } else if (operator == '/') {
    return num1 / num2;
  }
}

function processNumber(number) {
  // first let's see what's in the calculator already
  let displayedLine = document.querySelector('.calculator-display')

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
    lastButtonPressed = button;
    operatorPressedPrior = button;
  } else if (!operatorList.includes(operatorPressedPrior)) {
    priorNumber = document.querySelector('.calculator-display');
  }

}

let priorNumber = "";
let operatorList = ['+', '-', '*', '/'];
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
  })
})

