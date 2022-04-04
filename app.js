/* Register buttons */
const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    let input = e.target.classList[1];
    checkInput(e, input);
  });
});

/* Register display */
const display = document.querySelector(".output");
const topDisplay = document.querySelector(".top-output");

/* Declare values to be stored 
value1 = bottom value
value2 = top value */
let value1, value2, tempValue, prevOperator;

function checkInput(e, input) {
  switch (input) {
    case "digit":
      addToDisplay(e.target);
      break;
    case "clear":
      fullClear();
      break;
    case "add":
    case "subtract":
    case "multiply":
    case "divide":
      break;
    case "equal":
      break;
  }
}

/* Operator function to call add, subtract, multiply, divide */
function operate(operator, num1, num2) {
  let output = "";
  switch (operator) {
    case "add":
      return add(num1, num2);
    case "subtract":
      return subtract(num1, num2);
    case "multiply":
      return multiply(num1, num2);
    case "divide":
      output = `${num1} ÷ ${num2}`;
      return divide(num1, num2);
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

function addToDisplay(digitButton) {
  if (display.textContent == "0") {
    display.textContent = "";
    addToDisplay(digitButton);

    /* If NOT initial value, proceed to concat onto display and store in currentValue */
  } else {
    display.textContent += digitButton.textContent;
  }
}

function fullClear() {
  display.textContent = "0";
  topDisplay.textContent = "";
  value1 = undefined;
  value2 = undefined;
  tempValue = undefined;
}

function storeValue(value) {
  value = parseFloat(value);
  value = Math.round(value * 10000000) / 10000000;
  return value;
}
