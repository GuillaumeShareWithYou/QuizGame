import { Component, OnInit } from '@angular/core';
import {UserService} from '../user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title: string;
  constructor(public userService: UserService) { }

  ngOnInit() {
    this.title = 'Impractical Gamers';
  }

}
