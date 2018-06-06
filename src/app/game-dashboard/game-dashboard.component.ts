import { Component, OnInit } from '@angular/core';
import {animate, keyframes, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-game-dashboard',
  templateUrl: './game-dashboard.component.html',
  styleUrls: ['./game-dashboard.component.css'],
  animations: [
    trigger('game', [
      transition('void => *', [
        style({opacity: 0}),
        animate(800, keyframes([
          style({opacity: 0, transform: 'translateX(-50px)', offset: 0}),
          style({opacity: 1, transform: 'translateX(30px)',  offset: 0.3}),
          style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
        ]))
      ])
    ]),

  ]
})
export class GameDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
