/* Register buttons */
const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    let input = e.target.classList[1];
    checkInput(e, input);
  });
});

document.addEventListener('keydown', logKey);

/* Register display */
const display = document.querySelector('.output');
const topDisplay = document.querySelector('.top-output');

/* Declare values to be stored 
value1 = bottom value
value2 = top value */
let value1, value2, tempValue, currOperator;

function checkInput(e, input) {
  switch (input) {
    case 'delete':
      display.textContent = backspace();
      break;
    case 'digit':
      addToDisplay(e.target);
      break;
    case 'clear':
      fullClear();
      break;
    case 'add':
    case 'subtract':
    case 'multiply':
    case 'divide':
      if (!currOperator) currOperator = input;
      if (!value1) {
        value1 = storeValue(display.textContent);
        topDisplay.textContent = value1;
        display.textContent = 0;
      } else if (!value2) {
        value2 = storeValue(display.textContent);
        value1 = storeValue(operate(currOperator, value1, value2));
        topDisplay.textContent = value1;
        display.textContent = 0;
        value2 = undefined;
      }
      currOperator = input;
      break;
    case 'equal':
      if (currOperator) {
        value2 = storeValue(display.textContent);
        value1 = storeValue(operate(currOperator, value1, value2));
        topDisplay.textContent = value1;
        display.textContent = 0;
        value2 = undefined;
        currOperator = undefined;
        break;
      } else {
        break;
      }
  }
}

/* Operator function to call add, subtract, multiply, divide */
function operate(operator, num1, num2) {
  let output = '';
  switch (operator) {
    case 'add':
      return add(num1, num2);
    case 'subtract':
      return subtract(num1, num2);
    case 'multiply':
      return multiply(num1, num2);
    case 'divide':
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
  if (display.textContent == '0') {
    display.textContent = '';
    addToDisplay(digitButton);

    /* If NOT initial value, proceed to concat onto display and store in currentValue */
  } else {
    display.textContent += digitButton.textContent;
  }
}

function fullClear() {
  display.textContent = '0';
  topDisplay.textContent = '';
  value1 = undefined;
  value2 = undefined;
  tempValue = undefined;
}

function storeValue(value) {
  value = parseFloat(value);
  value = Math.round(value * 10000000) / 10000000;
  return value;
}

function backspace() {
  current = display.textContent;
  console.log(current.length);
  if (current.length > 1) {
    return current.substring(0, current.length - 1);
  } else {
    return 0;
  }
}


//need to change this to be Digit1 etc. 
//will also require reworking how we handle the addToDisplay
//    and the checkInput() function
function logKey(e) {
  console.log(e.code);
  switch (e.code) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
  }
}
