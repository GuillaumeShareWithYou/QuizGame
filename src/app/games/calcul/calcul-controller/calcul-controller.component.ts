import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {CalculService} from '../calcul.service';
import {CalculNotificationComponent} from '../calcul-notification/calcul-notification.component';
import {Notification} from '../notification';

@Component({
  selector: 'app-calcul-controller',
  templateUrl: './calcul-controller.component.html',
  styleUrls: ['./calcul-controller.component.css']
})
export class CalculControllerComponent implements OnInit {

  constructor(public game: CalculService) {
  }

  ngOnInit() {

  }


}
