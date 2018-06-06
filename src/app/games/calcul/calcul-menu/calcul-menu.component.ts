import { Component, OnInit } from '@angular/core';
import {CalculService} from '../calcul.service';

@Component({
  selector: 'app-calcul-menu',
  templateUrl: './calcul-menu.component.html',
  styleUrls: ['./calcul-menu.component.css']
})
export class CalculMenuComponent implements OnInit {

  constructor(public game: CalculService) { }

  ngOnInit() {

  }

}
