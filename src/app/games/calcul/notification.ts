import construct = Reflect.construct;

export class Notification {
  private _alertDegree: AlertDegree;
  private _message: string;

  constructor(alertDegree: AlertDegree = AlertDegree.INFO , message: string = '') {
    this._alertDegree = alertDegree;
    this._message = message;
  }


  get alertDegree(): AlertDegree {
    return this._alertDegree;
  }

  set alertDegree(value: AlertDegree) {
    this._alertDegree = value;
  }

  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }
}

export enum AlertDegree {
  SUCCESS = 'success',
  DANGER = 'danger',
  INFO = 'info'
}
