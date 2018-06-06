import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {CalculService} from '../calcul.service';
import {QuestionComponent} from '../../quiz/question/question.component';
import {Question} from '../../../entity/Question';
import {CalculNotificationComponent} from '../calcul-notification/calcul-notification.component';

@Component({
  selector: 'app-calcul-controller',
  templateUrl: './calcul-controller.component.html',
  styleUrls: ['./calcul-controller.component.css']
})
export class CalculControllerComponent implements OnInit {

@ViewChild('notification', {read: ViewContainerRef}) container: ViewContainerRef;

  constructor(public game: CalculService,
              private componentFactoryResolver: ComponentFactoryResolver ) { }

  ngOnInit() {
    this.game.notification.subscribe(n=>{
      this.createNotificationComponent(n);
    })
  }

  /**
   *
   * @param {string} message
   */
  createNotificationComponent(message: string) {
    const notificationFactory = this.componentFactoryResolver.resolveComponentFactory(CalculNotificationComponent);
    //Timeout pour être sur que le container soit accessible (il ne l'est pas sinon).
    setTimeout(()=> {
      console.log(message);
      this.container.clear();
      const componentRef = this.container.createComponent(notificationFactory);
      (<CalculNotificationComponent>componentRef.instance).notification = message;
    },0);

  }

}
