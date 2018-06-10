import {Component, Input, OnInit} from '@angular/core';
import {CalculService} from '../calcul.service';
import {animate, style, transition, trigger} from '@angular/animations';
import {Notification} from '../notification';

const lifeTimeNotification = 1500;

@Component({
  selector: 'app-calcul-notification',
  templateUrl: './calcul-notification.component.html',
  styleUrls: ['./calcul-notification.component.css'],
  animations: [
    trigger('notif', [
      transition('void => *', [
        style({transform: 'translateY(+50%)'}),
        animate('.5s ease-in')
      ]),
      transition(':leave', [
        animate('.5s ease-in', style({opacity: 0}))
      ]),
    ])
  ]
})
export class CalculNotificationComponent implements OnInit {

  notification: Notification = null;

  private clearListener;

  constructor(public game: CalculService) {
  }

  ngOnInit() {
    this.game.notification.subscribe(n => {
      if (!this.game.isRunning) {
        return;
      }
      this.notification = n;
      if (this.clearListener) {
        clearTimeout(this.clearListener);
      }
      this.clearListener = setTimeout(() => {
        this.notification = null
          console.log('notif disparait!');
      }, lifeTimeNotification);
    });

  }


}
