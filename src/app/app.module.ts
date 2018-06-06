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
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {QuizGameComponent} from './games/quiz/quiz-game/quiz-game.component';
import {QuizMenuComponent} from './games/quiz/quiz-menu/quiz-menu.component';
import { GameDashboardComponent } from './game-dashboard/game-dashboard.component';
import {StarsPipe} from './pipes/pipes';
import { CalculMenuComponent } from './games/calcul/calcul-menu/calcul-menu.component';
import { CalculGameComponent } from './games/calcul/calcul-game/calcul-game.component';
import {EquationPipe} from './games/calcul/equationPipe';
import { CalculControllerComponent } from './games/calcul/calcul-controller/calcul-controller.component';
import { CalculNotificationComponent } from './games/calcul/calcul-notification/calcul-notification.component';



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
    QuizMenuComponent,
    QuizGameComponent,
    GameDashboardComponent,
    StarsPipe,
    EquationPipe,
    CalculMenuComponent,
    CalculGameComponent,
    CalculControllerComponent,
    CalculNotificationComponent
  ],
  entryComponents: [QuestionComponent, CalculNotificationComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
