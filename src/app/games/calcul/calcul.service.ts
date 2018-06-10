import {Injectable} from '@angular/core';
import {Equation} from './Equation';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {AlertDegree, Notification} from './notification';


@Injectable({
  providedIn: 'root'
})
export class CalculService {

  public TIMER_MAX = 10000;
  private _isRunning = false;
  private _equation = new BehaviorSubject<Equation>(new Equation());
  private _notification = new BehaviorSubject<Notification>(new Notification());
  private _gameTimer = this.TIMER_MAX;
  private _score = 0;
  private timerInterval;
  private alreadyAnswer = false;
  constructor(private router: Router) {

  }

  static generateInteger(max, min = 1) {
    return Math.floor(Math.random() * (max + 1) + min);
  }

  /**
   * Generate a random Addition, Subtraction, Multiplication or Division Equation
   * @returns {Equation}
   */
  static getEquation(): Equation {
    const eq = new Equation();
    const dice = Math.random();
    let p1, p2, op;

    if (dice < .5) {
      // Addition ou soutraction
      p1 = CalculService.generateInteger(500);
      p2 = CalculService.generateInteger(500);
      op = Math.random() < .5 ? '+' : '-';
    } else if (dice < .75) {
      // Multiplication
      p1 = CalculService.generateInteger(100, 2);
      p2 = CalculService.generateInteger(100 - p1 + 2, 2);
      op = '*';
    } else {
      // Division

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

  /**
   * Start the game
   */
  public run() {
    this.timerInterval =  setInterval(() => {
      this.gameTimer -= 17;
      if (this.gameTimer <= 0) {
        this.stop();
      }
    }, 17);
    this.score = 0;
    this.gameTimer = this.TIMER_MAX;
    this.isRunning = true;
    this.alreadyAnswer = false;
    this.nextQuestion();
  }

  /**
   * Stop the game
   */
  public stop() {
    clearInterval(this.timerInterval);
    this.isRunning = false;
    this.timerInterval = null;
  }
  /**
   * Finish the game and redirect to the games dashboard
   */
  public quit() {
   // this.isRunning = false;
    this.router.navigate(['games']);
  }

  /**
   * The game progress to the next question
   */
  public nextQuestion() {
    this._equation.next(CalculService.getEquation());
    this.alreadyAnswer = false;
  }

  private onCorrectResponse() {
    this.alreadyAnswer = true;
    setTimeout(() => {
      this.nextQuestion();
    }, 300);
    this._score++;
    this._gameTimer +=  5000;
    if (this.gameTimer > this.TIMER_MAX) {
      this.gameTimer = this.TIMER_MAX;
    }
  }
  /**
   * Verify the user input if it match to the correct answer
   * @param {number} response
   */
  verifyAnswer(response: number) {
    if (this.alreadyAnswer) {
      return;
    }
    if (response === this.equation.value.result) {
      this.onCorrectResponse();
      this.notification.next(new Notification(AlertDegree.SUCCESS, 'Bonne réponse'));
    } else {
      this.notification.next(new Notification(AlertDegree.DANGER, 'Mauvaise réponse'));
    }
  }


  get isRunning(): boolean {
    return this._isRunning;
  }

  set isRunning(value: boolean) {
    this._isRunning = value;
  }

  get equation(): BehaviorSubject<Equation> {
    return this._equation;
  }


  get notification(): BehaviorSubject<Notification> {
    return this._notification;
  }

  set notification(value: BehaviorSubject<Notification>) {
    this._notification = value;
  }

  get gameTimer(): number {
    return this._gameTimer;
  }

  set gameTimer(value: number) {
    this._gameTimer = value;
  }

  get score(): number {
    return this._score;
  }

  set score(value: number) {
    this._score = value;
  }
}
