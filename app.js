/* Register buttons */
const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    switch (e.target.classList[1]) {
      case "digit":
        addToDisplay(e.target);
        break;
      case "clear":
        clear();
        break;
    }
  });
});

/* Register display */
const display = document.querySelector(".output");

/* Declare value for displaying */
let currentValue;
let decimalToggle = false;

/* Operator function to call add, subtract, multiply, divide */
function operate(operator, num1, num2) {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "x":
      return multiply(num1, num2);
    case "÷":
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
  /* check for 0 value */
  if (display.textContent == "0") {
    display.textContent = "";
    addToDisplay(digitButton);

    /* If NOT initial value, proceed to concat onto display and store in currentValue */
  } else {
    display.textContent += digitButton.textContent;

    // handle undefined currentValue (first digit entry);
    if (currentValue == undefined) {
      currentValue = digitButton.textContent;
      currentValue = parseFloat(currentValue);
    } else if (digitButton.textContent == ".") {
      decimalToggle = true;
    }
    // add button value to currentValue and display
    else {
      if (decimalToggle) {
        currentValue = currentValue.toString() + "." + digitButton.textContent;
        currentValue = parseFloat(currentValue);
        decimalToggle = false;
      } else {
        currentValue = currentValue.toString() + digitButton.textContent;
        currentValue = parseFloat(currentValue);
      }
    }
  }
  console.log(currentValue);
}

function clear() {
  display.textContent = "0";
  currentValue = undefined;
}
