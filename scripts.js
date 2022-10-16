const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    this.currentOperation = "";
  }
  //insere um digito no visor da calculadora
  addDigit(numero) {
    //verifica se ja existe um ponto na operação:
    if (numero === "." && this.currentOperationText.innerText.includes(".")) {
      return;
    }

    this.currentOperation = numero;
    this.updateScreen();
  }
  // process all calculator operations
  processOperation(operation) {
    //check if current is empty
    if (this.currentOperationText.innerText === "" && operation != "C") {
      //changeOperation
      if (this.previousOperationText.innerText !== "") {
        this.changeOperation(operation);
      }
      return;
    }

    //get current and previous values
    let operationValue;
    const previous = +this.previousOperationText.innerText.split(" ")[0];
    const current = +this.currentOperationText.innerText;

    switch (operation) {
      case "+":
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "-":
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "*":
        operationValue = previous * current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "/":
        operationValue = previous / current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "DEL":
        this.processDelOperator();
        break;
      case "CE":
        this.processClearCurrentOperation();
      case "C":
        this.processClearAllOperation();
      case "=":
        this.processEqualOperator();
        break;
      default:
        return;
    }
  }

  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {
    console.log(operationValue, operation, current, previous);
    if (operationValue == null) {
      this.currentOperationText.innerText += this.currentOperation;
    } else {
      // check if value is zero, if it is just add current value

      if (previous === 0) {
        operationValue = current;
      }
      //add current value to previous
      this.previousOperationText.innerText = `${operationValue} ${operation}`;
      this.currentOperationText.innerText = "";
    }
  }
  //change math operation

  changeOperation(operation) {
    const mathOperations = ["*", "/", "-", "+"];
    if (!mathOperations.includes(operation)) {
      return;
    }
    this.previousOperationText.innerText =
      this.previousOperationText.innerText.slice(0, -1) + operation;
  }
  //delete the last digit
  processDelOperator() {
    this.currentOperationText.innerText =
      this.currentOperationText.innerText.slice(0, -1);
  }
  //erase current operation
  processClearCurrentOperation() {
    this.currentOperationText.innerText = "";
  }

  processClearAllOperation() {
    this.currentOperationText.innerText = "";
    this.previousOperationText.innerText = "";
  }
  processEqualOperator(){
    const operation = previousOperationText.innerText.split(" ")[1]
    this.processOperation(operation)
  }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) =>
  btn.addEventListener("click", (evento) => {
    const value = evento.target.innerText;
    if (value >= 0 || value === ".") {
      calc.addDigit(value);
    } else {
      calc.processOperation(value);
    }
  })
);
