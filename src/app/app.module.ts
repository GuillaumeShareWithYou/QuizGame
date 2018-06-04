import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './user/login/login.component';
import {RegisterComponent} from './user/register/register.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProfileComponent} from './user/profile/profile.component';
import {HttpClientModule} from '@angular/common/http';
import { QuestionComponent } from './games/quiz/question/question.component';
import { GameMenuComponent } from './games/quiz/game-menu/game-menu.component';
import { QuizComponent } from './games/quiz/quiz/quiz.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    ProfileComponent,
    QuestionComponent,
    GameMenuComponent,
    QuizComponent,
  ],
  entryComponents: [QuestionComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
