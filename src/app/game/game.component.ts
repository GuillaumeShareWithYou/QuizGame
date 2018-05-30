import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {QuestionService} from '../question.service';
import {Question} from '../entity/Question';
import {Observable} from 'rxjs';
import {QuestionComponent} from '../question/question.component';
import {container} from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  @ViewChild('questionContainer', {read: ViewContainerRef}) container: ViewContainerRef;

  public questions: Question[];


  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private questionService: QuestionService) {

  }

  ngOnInit() {

    this.questionService.fetchQuestions()
    .subscribe(qs=>{
      this.questions = qs;
      this.createQuestionComponent(qs[0]);
    })

  }

  /**
   * Replace the QuestionComponent with a new one.
   * @param {Question} question the input in the QuestionComponent
   */
  createQuestionComponent(question: Question){
    const questionFactory = this.componentFactoryResolver.resolveComponentFactory(QuestionComponent);
    this.container.clear();
    const componentRef =  this.container.createComponent(questionFactory);
    (<QuestionComponent>componentRef.instance).question = question;
  }


}
