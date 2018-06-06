import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {QuizService} from '../quiz.service';
import {Category} from '../../../entity/Category';
import {d} from '@angular/core/src/render3';
import {Form, FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {mustNotMatchValidator} from '../../../validator/validators';

@Component({
  selector: 'game-menu',
  templateUrl: './quiz-menu.component.html',
  styleUrls: ['./quiz-menu.component.css'],
  animations: [
    trigger('category', [
      transition('void => *', [
        style({transform: 'translateY(+50%)', opacity: 0}),
        animate('2s ease')
      ])
    ]),
  ]
})
export class QuizMenuComponent implements OnInit {

  public quizForm: FormGroup;
  public categories: Category[] = [];
  public difficulties = [
    {name: 'Toutes', value: ''},
    {name: 'Facile', value: 'easy'},
    {name: 'Moyenne', value: 'medium'},
    {name: 'Difficile', value: 'hard'}
  ];

  constructor(public quiz: QuizService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.quiz.fetchAllCategories()
      .subscribe(all => {
        this.categories = all.sort((a, b) => a.name < b.name ? -1 : 1);
      });
    this.quizForm = this.fb.group({
        'category': [this.quiz.category || ''],
        'difficulty': [this.quiz.difficulty || this.difficulties[0].value
        ],
        'numberQuestions': ['10',
          [Validators.min(1), Validators.max(30), Validators.required]
        ]
      }
    );
  }

  onSubmit() {
    if(!this.quizForm.valid)
      return;

    this.quiz.start(
      this.quizForm.get('category').value,
      this.quizForm.get('difficulty').value,
      this.quizForm.get('numberQuestions').value);
  }

  private previousChecked;

  /**
   * Toggle the value of the radio button.
   * If we click on the same twice, it 'de'checked it and remove value from the formGroup.
   * @param e
   */
  toggleChecked(e) {
    let input = e.target
    if(input === this.previousChecked){
      input.checked = false;
      this.previousChecked = null;
      this.quizForm.get('category').setValue('');
    }else{
      this.previousChecked = input;
    }
  }
}
