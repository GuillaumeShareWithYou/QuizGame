import {EventEmitter, Injectable} from '@angular/core';
import {Question} from '../../entity/Question';
import {HttpClient, HttpParams} from '@angular/common/http';
import {delay, map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {BehaviorSubject, of, Observable, from} from 'rxjs';
import {Category} from '../../entity/Category';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private questions: BehaviorSubject<Question[]> = new BehaviorSubject([]);
  private _difficulty: string = '';
  private _category: string = '';
  private _numberOfQuestions = 6;
  private _encode = 'url3986';
  private _currentQuestion: Question;
  private _nthQuestion = 0;
  private _score = 0;
  private _timer = 0;
  private timerInterval;
  private _gameState: QuizState;
  private _isReady = new BehaviorSubject<boolean>(false);
  private _scoreChangedEmitter = new EventEmitter<number>();
  constructor(private http: HttpClient) {
    this.initGame();
  }

  public start(categoryId='', difficulty='', number = 6) {
    this.category = categoryId;
    this.difficulty = difficulty;
    this.setNumberOfQuestions(number);
    let sub = this.fetchQuestions();
    this._gameState = QuizState.PLAYING;
    sub.subscribe(e => {
        let temp = [];
        e.forEach(question=>{
          let q = new Question();
          q.question = unescape(question.question);
          q.category = unescape(question.category);
          q.correct_answer = unescape(question.correct_answer);
          q.incorrect_answers = [];
          question.incorrect_answers.forEach(answer => q.incorrect_answers.push(unescape(answer)));
          q.type = question.type;
          q.difficulty = question.difficulty;
          temp.push(q);
        });
        this.questions.next(temp);
        this._numberOfQuestions = e.length;
      },
      error => console.log(error),
      () => {
        this.timerInterval = setInterval(() => this._timer += 1000, 1000);
        this._isReady.next(true);
        console.log('game ready to go');

      });
    return sub;
  }

  public initGame() {
    this._gameState = QuizState.MENU;
    this._score = 0;
    this._timer = 0;
    this._nthQuestion = 0;
  }


  countCorrectAnswer(difficulty) {

    let delta = difficulty === 'medium' ? 5 : difficulty === 'hard' ? 10 : 1;
    this.score += delta;
    this.scoreChangedEmitter.emit(delta);
  }

  fetchQuestions(): Observable<Question[]> {
    console.log('fetch');
    let params = new HttpParams()
      .append('category', this._category)
      .append('amount', this._numberOfQuestions.toString())
      .append('difficulty', this._difficulty)
      .append('encode', this._encode);
    console.log(params.toString());
    return this.http.get(`${environment.API_QUESTIONS + '?' + params.toString()}`)
      .pipe(map(r => r['results']), delay(500));
  }

  fetchAllCategories(): Observable<Category[]> {
    return this.http.get(`${environment.API_CATEGORIES}`)
      .pipe(map(e => e['trivia_categories']));
  }

  public getNextQuestion(): Question {
    if (this.questions.value.length === 0) {
      this.endGame();
      throw new Error('game over');
    }
    ++this._nthQuestion;
    return this._currentQuestion = this.questions.value.shift();
  }

  public getCurrentQuestion(){
    return this._currentQuestion;
  }

  public endGame() {
    this._gameState = QuizState.END;
    this._isReady.next(false);
    clearInterval(this.timerInterval);
  }


  set difficulty(value: string) {
    this._difficulty = value;
  }

  set category(value: string) {
    this._category = value;
  }


  get difficulty(): string {
    return this._difficulty;
  }

  get category(): string {
    return this._category;
  }

  setNumberOfQuestions(number) {
      this._numberOfQuestions = number > 0 ? number < 26 ? number : 25 : 5
  }


  get numberOfQuestions(): number {
    return this._numberOfQuestions;
  }


  get encode(): string {
    return this._encode;
  }

  set encode(value: string) {
    this._encode = value;
  }

  get currentQuestion(): Question {
    return this._currentQuestion;
  }

  set currentQuestion(value: Question) {
    this._currentQuestion = value;
  }

  get nthQuestion(): number {
    return this._nthQuestion;
  }

  set nthQuestion(value: number) {
    this._nthQuestion = value;
  }

  get timer(): number {
    return this._timer;
  }


  get score(): number {
    return this._score;
  }

  set score(value: number) {
    this._score = value;
  }

  set timer(value: number) {
    this._timer = value;
  }

  get gameState(): QuizState {
    return this._gameState;
  }

  set gameState(value: QuizState) {
    this._gameState = value;
  }

  get isReady(): BehaviorSubject<boolean> {
    return this._isReady;
  }

  set isReady(value: BehaviorSubject<boolean>) {
    this._isReady = value;
  }

  get scoreChangedEmitter(): EventEmitter<number> {
    return this._scoreChangedEmitter;
  }

  set scoreChangedEmitter(value: EventEmitter<number>) {
    this._scoreChangedEmitter = value;
  }
}

export enum QuizState {
  MENU = 'menu', PLAYING = 'playing', END = 'end'
}
