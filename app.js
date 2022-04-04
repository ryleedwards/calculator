/* Register buttons */
const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    let input = e.target.classList[1];
    switch (input) {
      case "digit":
        addToDisplay(e.target);
        break;
      case "clear":
        clear();
        break;
      case "add":
      case "subtract":
      case "multiply":
      case "divide":
        let oldValue = currentValue;
        currentValue = storeValue();
        console.log(`oldValue: ${oldValue} // currentValue: ${currentValue}`);
        if (oldValue) {
          let solution = operate(input, oldValue, currentValue);
          console.log(`solution: ${solution}`);
          display.textContent = solution.toString();
          currentValue = solution;
        }
        break;
      case "equal":
    }
  });
});

/* Register display */
const display = document.querySelector(".output");

/* Declare value for displaying */
let currentValue;

/* Operator function to call add, subtract, multiply, divide */
function operate(operator, num1, num2) {
  switch (operator) {
    case "add":
      return add(num1, num2);
    case "subtract":
      return subtract(num1, num2);
    case "multiply":
      return multiply(num1, num2);
    case "divide":
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

function storeValue() {
  return parseFloat(display.textContent);
}

function clear() {
  display.textContent = "0";
  currentValue = undefined;
}
