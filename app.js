const validInputs = ["1234567890.", "+-*/", "=EnterBackspaceEscape"];

// Register buttons
const buttons = document.querySelectorAll("button");
const btnAdd = document.getElementById("+");
const btnSubtract = document.getElementById("-");
const btnMultiply = document.getElementById("x");
const btnDivide = document.getElementById("÷");
const operatorBtns = [btnAdd, btnSubtract, btnMultiply, btnDivide];
buttons.forEach((button) => {
  button.addEventListener("click", buttonPress);
});

// Register keydown
document.addEventListener("keydown", logKey);

// Register display
const display = document.querySelector(".output");
const topDisplay = document.querySelector(".top-output");

// Global values
let value1, value2, currOperator;

/* Begin functions */

function buttonPress(e) {
  let entry = {
    type: e.target.classList[1],
    value: e.target.classList[2],
  };
  handleEntry(entry);
}

function logKey(e) {
  let entry = {
    type: undefined,
    value: e.key,
  };
  //assign type based on source const list of values validInputs
  if (validInputs[0].includes(e.key)) {
    entry.type = "digit";
  } else if (validInputs[1].includes(e.key)) {
    entry.type = "operator";
  } else if (validInputs[2].includes(e.key)) {
    entry.type = "action";
  }
  handleEntry(entry);
}

function handleEntry(entry) {
  switch (entry.type) {
    case "digit":
      digit(entry.value);
      break;
    case "operator":
      operator(entry.value);
      break;
    case "action":
      action(entry.value);
      break;
  }
}

function digit(entryValue) {
  console.log(entryValue);
  // check if display is maxed
  if (display.textContent.length > 9) {
    return;
  }
  // fresh entry
  else if (display.textContent === "0") {
    display.textContent = "";
    digit(entryValue);
    // don't allow another decimal
  } else if (entryValue == "." && display.textContent.includes(".")) {
    return;
    // add to display
  } else {
    display.textContent += entryValue;
  }
}

const add = (num1, num2) => {
  return num1 + num2;
};
const subtract = (num1, num2) => {
  return num1 - num2;
};
const multiply = (num1, num2) => {
  return num1 * num2;
};
const divide = (num1, num2) => {
  return num1 / num2;
};

function clear() {
  display.textContent = "0";
  topDisplay.textContent = "";
  value1 = undefined;
  value2 = undefined;
  tempValue = undefined;
}

function store(value) {
  value = parseFloat(value);
  value = Math.round(value * 10000000) / 10000000;
  return value;
}

// operator button is pushed
function operator(operatorValue) {
  if (!value1) {
    value1 = store(display.textContent);
    topDisplay.textContent = value1;
    display.textContent = "0";
    currOperator = operatorValue;
    indicateBtn(currOperator);
  } else if (display.textContent != "0") {
    value2 = store(display.textContent);
    value1 = operate(currOperator, value1, value2);
    topDisplay.textContent = value1;
    display.textContent = "0";
    currOperator = operatorValue;
    indicateBtn(currOperator);
    value2 = undefined;
  } else {
    currOperator = operatorValue;
    indicateBtn(currOperator);
  }
}

function operate(operator, num1, num2) {
  if (currOperator) {
    switch (currOperator) {
      case "+":
        return store(add(num1, num2));
      case "-":
        return store(subtract(num1, num2));
      case "x":
      case "*":
        return store(multiply(num1, num2));
      case "÷":
      case "/":
        if (num2 != 0) return store(divide(num1, num2));
        else return "div/0";
    }
  } else {
    currOperator = operator;
  }
}

function action(entryValue) {
  switch (entryValue) {
    case "Backspace":
    case "delete":
      backspace();
      break;
    case "Escape":
    case "clear":
      clear();
      break;
    case "Enter":
    case "=":
      if (!currOperator) {
        return;
      }
      if (!value2) {
        value2 = store(display.textContent);
      }
      value1 = operate(currOperator, value1, value2);
      topDisplay.textContent = value1;
      display.textContent = 0;
      value2 = undefined;
      currOperator = undefined;
      clearIndicators();
      break;
  }
}

function backspace() {
  current = display.textContent;
  if (current.length > 1) {
    display.textContent = current.substring(0, current.length - 1);
  } else {
    display.textContent = "0";
  }
}

function indicateBtn(operator) {
  clearIndicators();
  let button;
  switch (operator) {
    case "+":
      button = btnAdd;
      break;
    case "-":
      button = btnSubtract;
      break;
    case "x":
    case "*":
      button = btnMultiply;
      break;
    case "÷":
    case "/":
      button = btnDivide;
      break;
  }
  button.style.backgroundColor = `var(--button-press)`;
  button.style.color = `var(--font-black)`;
}

function clearIndicators() {
  operatorBtns.forEach((button) => {
    button.style.backgroundColor = `var(--black-button)`;
    button.style.color = `var(--font-gray)`;
  });
}
