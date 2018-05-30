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
import {GameComponent} from './game/game.component';
import {ProfileComponent} from './user/profile/profile.component';
import {HttpClientModule} from '@angular/common/http';
import { QuestionComponent } from './question/question.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    GameComponent,
    ProfileComponent,
    QuestionComponent,
  ],
  entryComponents: [QuestionComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
