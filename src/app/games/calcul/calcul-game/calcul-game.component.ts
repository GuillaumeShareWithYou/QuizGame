import {AfterViewInit, Component, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild} from '@angular/core';
import {CalculService} from '../calcul.service';
import {Equation} from '../Equation';
import {isNumber} from 'util';

@Component({
  selector: 'app-calcul-game',
  templateUrl: './calcul-game.component.html',
  styleUrls: ['./calcul-game.component.css']
})
export class CalculGameComponent implements OnInit {

  private _equation: Equation;
  private _response: string;

  constructor(public game: CalculService) {
  }


  ngOnInit() {
    this.game.equation.subscribe(eq => {
      this._equation = eq;
      this.getReadyNextQuestion();
    });
  }

  getReadyNextQuestion() {
    document.getElementById('result').focus();
  }

  /**
   * Prend en charge l'évenement de réponse de l'utilisateur
   */
  onResponse() {

    if (this._response.trim().length === 0){
      return;
    }
    this.game.verifyAnswer(parseInt(this._response, 10));
    this._response = '';
  }

  verifyKey(e: KeyboardEvent) {

    if (e.key === 'Enter') {
      this.onResponse();
    }
    if (!this.isValid(e.key)) {
      e.preventDefault();
    }
  }


  /**
   * Vérifie si la touche est valide
   * @param n
   * @returns {boolean}
   */
  isValid(n) {
    return n === 'Backspace' || n.match(/^[0-9\-]$/) != null;
  }


  get equation(): Equation {
    return this._equation;
  }

  set equation(value: Equation) {
    this._equation = value;
  }

  get response(): string {
    return this._response;
  }

  set response(value: string) {
    this._response = value;
  }

}
