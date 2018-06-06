import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from '../../../entity/Question';
import {QuizService} from '../quiz.service';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
  animations: [
    trigger('question', [
      transition('void => *', [
        style({opacity: .8}),
        animate('.5s ease-in')
      ]),
    ])
  ]
})
export class QuestionComponent implements OnInit {

  @Input() question: Question;
  @Output() answer: EventEmitter<boolean> = new EventEmitter<boolean>();
  public answers = [];
  private correctAnswerPosition;
  private hasAlreadyAnswered = false;

  constructor(public quiz: QuizService) {
  }

  ngOnInit() {
    //TODO Change this logic
    this.answers = [];
    let numberAnswers = this.question.incorrect_answers.length + 1;
    this.correctAnswerPosition = Math.floor(Math.random() * (numberAnswers));
    console.log('new question', this.question.question);
    let temp = [];
    for (let i = 0, j = 0; i < numberAnswers; ++i) {
      if (i === this.correctAnswerPosition) {
        temp[i] = this.question.correct_answer;
      } else {
        temp[i] = this.question.incorrect_answers[j];
        ++j;
      }
    }

    this.answers = temp;
  }

  onAnswer(e) {
    if (this.hasAlreadyAnswered)
      return;
    this.hasAlreadyAnswered = true;

    let userChoice = e.target;
    let correctAnswer = userChoice.innerText === this.question.correct_answer;
    userChoice.classList.add('pendingAnswer');
    setTimeout(() => {
      document.getElementById('answer-' + this.correctAnswerPosition).classList.add('correctAnswer');
      if (!correctAnswer) {
        userChoice.classList.add('incorrectAnswer');
      }
      userChoice.classList.remove('pendingAnswer');
    }, 200);

    setTimeout(() => {
      if (correctAnswer) {
        this.quiz.countCorrectAnswer(this.question.difficulty);
      }
      this.answer.emit(correctAnswer);
    }, 1000);


  }

}
