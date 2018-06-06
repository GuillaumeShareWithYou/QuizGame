import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, FormControl, NgModel, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  username: string;
  password: string;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {

  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', [Validators.required]]
    });
  }

  onSubmit(form: FormGroup) {
    this.userService.login(form.get('email').value, form.get('password').value)
      .subscribe(u => {
          this.userService.user = u;
          this.router.navigate(['play']);
        },
        error => {
          console.log('erreur retournée', error);
        }
      );
  }
  log(e){console.log(e)}


}
