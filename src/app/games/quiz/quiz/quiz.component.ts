import {Component, ComponentFactoryResolver, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import {QuizService, QuizState} from '../../../quiz.service';
import {Question} from '../../../entity/Question';
import {BehaviorSubject, Subscription} from 'rxjs';
import {QuestionComponent} from '../question/question.component';
import {createComponent} from '@angular/compiler/src/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit, OnDestroy {

  @ViewChild('questionContainer', {read: ViewContainerRef}) container: ViewContainerRef;

  currentSub: Subscription;
  isReadySub: Subscription;
  QuizState: typeof QuizState = QuizState;
  question: Question;
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    public quiz: QuizService,
    private router: Router) {}

  ngOnInit() {

    //Le jeu est deja lancé, on reste sur la même question
    if (this.quiz.gameState === QuizState.PLAYING) {
      this.createQuestionComponent(this.quiz.getCurrentQuestion());
      return;
    }

    //On attends que le jeu soit prêt pour commencer
   this.isReadySub = this.quiz.isReady.subscribe(isReady=>{
      if (isReady) {
        this.nextQuestion();
        console.log('game ready by gameComponent')
      }
    });

  }

/*
  start() {
    this.quiz.start().subscribe(()=>{
      this.nextQuestion()
    })
  }*/

  replay() {
    this.quiz.initGame();
  }

  /**
   * Replace the QuestionComponent with a new one.
   * @param {Question} question the input in the QuestionComponent
   */
  createQuestionComponent(question: Question) {
    const questionFactory = this.componentFactoryResolver.resolveComponentFactory(QuestionComponent);
    //Timeout pour être sur que le container soit accessible (il ne l'est pas sinon).
    setTimeout(()=>{
      this.container.clear();
      const componentRef = this.container.createComponent(questionFactory);
      (<QuestionComponent>componentRef.instance).question = question;
      this.currentSub = (<QuestionComponent>componentRef.instance).answer.subscribe(()=>{

        this.nextQuestion();
      })
    },50)

  }

  nextQuestion(){
    try{
      const question = this.quiz.getNextQuestion();
      this.createQuestionComponent(question);
    }catch (e) {
      //game over
    }

  }

  ngOnDestroy(){
   if(this.currentSub){
     this.currentSub.unsubscribe();
   }
    if (this.isReadySub) {
      this.isReadySub.unsubscribe();
    }
  }
}
