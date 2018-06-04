import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from '../../../entity/Question';
import {QuizService} from '../../../quiz.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input() question: Question;
  @Output() answer: EventEmitter<boolean> = new EventEmitter<boolean>();
  public answers = [];

  constructor(public quiz: QuizService) {
  }

  ngOnInit() {
    this.answers = [];
    this.question.question = unescape(this.question.question);
    this.question.category = unescape(this.question.category);
    console.log('new question', this.question.question);
    let temp = this.question.incorrect_answers.slice();
    temp.push(this.question.correct_answer);
    temp.sort((a, b) => Math.random() > .5 ? -1 : 1);
    temp = temp.map(e => unescape(e));

    this.answers = temp;
  }

  onAnswer(e) {
    this.quiz.checkoutAnswer(e.target.innerText);
    this.answer.emit(unescape(this.question.correct_answer) === e.target.innerText);

  }

}
