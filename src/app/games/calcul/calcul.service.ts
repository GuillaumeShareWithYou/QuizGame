import {Injectable} from '@angular/core';
import {Equation} from './Equation';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CalculService {

  private _isRunning = false;
  private _equation = new BehaviorSubject<Equation>(new Equation());
  private _notification = new BehaviorSubject<string>('');
  constructor(private router: Router) {
  }

  run() {
    this.isRunning = true;
    this.nextQuestion();
  }

  quit() {
    this.isRunning = false;
    this.router.navigate(['games']);
  }

  public nextQuestion() {
    this._equation.next(this.getEquation());
  }

  /**
   * Generate a random Addition, Subtraction, Multiplication or Division
   * @returns {Equation}
   */
  public getEquation(): Equation {
    let eq = new Equation();
    let dice = Math.random();
    let p1, p2, op;

    if (dice < .5) {
      //Addition ou soutraction
      p1 = CalculService.generateInteger(500);
      p2 = CalculService.generateInteger(500);
      op = Math.random() < .5 ? '+' : '-';
    }
    else if (dice < .75) {
      //Multiplication
      p1 = CalculService.generateInteger(100, 2);
      p2 = CalculService.generateInteger(100 - p1 + 2, 2);
      op = '*'
    } else {
      //Division

      p1 = CalculService.generateInteger(20);
      p2 = CalculService.generateInteger(20);
      p1 = p1 * p2;
      op = '/';
    }

    eq.operandLeft = p1;
    eq.operandRight = p2;
    eq.operator = op;
    return eq;
  }


  private static generateInteger(max, min = 1) {
    return Math.floor(Math.random() * (max + 1) + min);
  }
  verifyAnswer(response: string) {

    if (response == this.equation.value.result) {

     this.notification.next('bonne réponse')
    }else{
      this.notification.next('mauvaise réponse')
    }

    setTimeout(()=>{
      this.nextQuestion();
    },1000)
  }

  //GETTERS, SETTERS AND SHIT

  get isRunning(): boolean {
    return this._isRunning;
  }

  set isRunning(value: boolean) {
    this._isRunning = value;
  }

  get equation(): BehaviorSubject<Equation> {
    return this._equation;
  }


  get notification(): BehaviorSubject<string> {
    return this._notification;
  }

  set notification(value: BehaviorSubject<string>) {
    this._notification = value;
  }
}
