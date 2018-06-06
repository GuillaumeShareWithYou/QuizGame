import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './user/login/login.component';
import {RegisterComponent} from './user/register/register.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AuthGuard} from './guards/auth.guard';
import {ProfileComponent} from './user/profile/profile.component';
import {QuizGameComponent} from './games/quiz/quiz-game/quiz-game.component';
import {GameDashboardComponent} from './game-dashboard/game-dashboard.component';
import {CalculGameComponent} from './games/calcul/calcul-game/calcul-game.component';
import {CalculControllerComponent} from './games/calcul/calcul-controller/calcul-controller.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'games',
    component: GameDashboardComponent
  },
  {path: 'quiz',
  //  canActivate: [AuthGuard],
    component: QuizGameComponent
  },
  {
    path: 'calcul',
    component: CalculControllerComponent
  },
  { path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
