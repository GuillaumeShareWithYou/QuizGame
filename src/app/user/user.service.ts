import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {User} from '../entity/User';
import {environment} from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
  //  'Content-Type': 'application/json'
    'Content-Type': 'application/x-www-form-urlencoded',

  })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user: User;

  constructor(private http: HttpClient) {
  }

  login(email: string = '', password: string = ''): Observable<User> {

    const body = new HttpParams()
      .set('email', email)
      .set('password', password);
     return this.http.post<User>(`${environment.API_USERS}/session/login`, body, httpOptions);
  }

  register(user: User) {
    let params = new HttpParams();
    Object.keys(user).forEach( key =>{
      params = params.append(key, user[key])
    });

    return this.http.post<User>(`${environment.API_USERS}/session/register`, params , httpOptions)
  }

  findAll(){
    return this.http.get<User[]>(`${environment.API_USERS}/users`);
  }

/*
  register(username: string, email: string, password: string): Observable<User> {

    const body = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('email', email);
    return this.http.post<User>(`${environment.API_TEST}`, {email, password, username}, httpOptions);
  }*/


  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }


  put(v: any) {

    let params = new HttpParams().set('username','toto');
    console.log(params.toString())
    this.http.put(`${environment.API_USERS}/user/48`, params.toString(), httpOptions).subscribe(r=>console.log(r))
  }
}
