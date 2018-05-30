import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Question} from './entity/Question';
import {delay, map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  fetchQuestions() : Observable<Question[]>{
   return this.http.get('assets/questions.json')
     .pipe(map(r=>r['results']), delay(1000));
  }
}
