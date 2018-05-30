import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './user/login/login.component';
import {RegisterComponent} from './user/register/register.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AuthGuard} from './auth.guard';
import {GameComponent} from './game/game.component';
import {ProfileComponent} from './user/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
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
  {path: 'play',
  //  canActivate: [AuthGuard],
    component: GameComponent
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
