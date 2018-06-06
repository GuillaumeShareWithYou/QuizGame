export class Equation{
  private _operandLeft;
  private _operandRight;
  private _operator;
  private _result;

  get operandLeft() {
    return this._operandLeft;
  }

  set operandLeft(value) {
    this._operandLeft = value;
  }

  get operandRight() {
    return this._operandRight;
  }

  set operandRight(value) {
    this._operandRight = value;
  }

  get operator() {
    return this._operator;
  }

  set operator(value) {
    this._operator = value;
  }

  get result() {
    return eval(this.operandLeft + this.operator + this.operandRight);
  }

  set result(value) {
    this._result = value;
  }
}
