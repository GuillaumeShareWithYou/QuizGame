import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {QuizService} from '../../../quiz.service';
import {Category} from '../../../entity/Category';
import {d} from '@angular/core/src/render3';
import {Form, FormGroup, NgForm} from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'game-menu',
  templateUrl: './game-menu.component.html',
  styleUrls: ['./game-menu.component.css'],
  animations: [
    trigger('category', [
      transition('void => *', [
        style({transform: 'translateY(+50%)', opacity: 0}),
        animate('2s ease')
      ])
    ]),
  ]
})
export class GameMenuComponent implements OnInit {

  public categories: Category[] = [];
  constructor(public quiz: QuizService) { }

  ngOnInit() {
    this.quiz.fetchAllCategories()
      .subscribe(all => {
        this.categories = all.sort((a,b)=>a.name< b.name? -1 : 1)
      });
  }

  onSubmit(form: NgForm) {
    this.quiz.start(form.value.category, form.value.difficulty, form.value.number);
  }
}
