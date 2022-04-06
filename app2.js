const validInputs = ["1234567890.", "+-*/", "=EnterBackspaceEscape"];

// Register buttons
const buttons = document.querySelectorAll("button");
const btnAdd = document.getElementById("+");
const btnSubtract = document.getElementById("-");
const btnMultiply = document.getElementById("x");
const btnDivide = document.getElementById("÷");
buttons.forEach((button) => {
  button.addEventListener("click", buttonPress);
});

// Register keydown
document.addEventListener("keydown", logKey);

// Register display
const display = document.querySelector(".output");
const topDisplay = document.querySelector(".top-output");

// Global values
let value1, value2, tempValue, currOperator;

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
  console.log(operatorValue);
  value1 = store(display.textContent);
  display.textContent = "0";
  topDisplay.textContent = value1;
  currOperator = operatorValue;
}

function operate(operator, num1, num2) {
  if (value1 != undefined && value2 != undefined) {
    switch (operator) {
      case "+":
        return store(add(num1, num2));
      case "-":
        return store(subtract(num1, num2));
      case "x":
        return store(multiply(num1, num2));
      case "÷":
      case "/":
        console.log(`num1 = ${num1} // num2 = ${num2}`);
        if (num2 != 0) return store(divide(num1, num2));
        else return "div/0";
    }
  } else {
    console.log("Tried to operate without v1 & v2");
    return;
  }
}

function action(entryValue) {
  console.log(entryValue);
  switch (entryValue) {
    case "Backspace":
      backspace();
      break;
    case "Escape":
      clear();
      break;
    case "Enter":
    case "=":
      value2 = store(display.textContent);
      topDisplay.textContent = operate(currOperator, value1, value2);
      display.textContent = 0;
      value2 = undefined;
      currOperator = undefined;
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
