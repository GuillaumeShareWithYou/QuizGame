import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {CalculService} from '../calcul.service';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-calcul-notification',
  templateUrl: './calcul-notification.component.html',
  styleUrls: ['./calcul-notification.component.css'],
  animations: [
    trigger('notif', [
      transition('void => *', [
        style({opacity: 0}),
        animate('2s ease-in')
      ]),
    ])
  ]
})
export class CalculNotificationComponent implements OnInit {

  @Input() notification = '';

  constructor(public game: CalculService) { }

  ngOnInit() {

  }


}
