import {Component, OnInit} from '@angular/core';
import {UserService} from '../../user.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { identicalPasswordValidator, mustMatchValidator, mustNotMatchValidator} from '../../validator/validators';
import {Router, NavigationExtras, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  constructor(private fb: FormBuilder,
              private router: Router,
              private userService: UserService) {}

  ngOnInit() {
    const passwordCtrl = new FormControl('el585',
      [
        Validators.required,
        mustMatchValidator(new RegExp('^[a-z0-9_]{5,12}$'))
      ]
    );
    const passwordConfirmCtrl = new FormControl('el585');


    this.registerForm = this.fb.group({
      'username': ['PogChamp',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
          mustNotMatchValidator(new RegExp('^.*@.*$'))
        ]
      ],
      'email': ['pog@twitch.fr',
        [
          Validators.required,
          Validators.email
        ]
      ],
      'password': passwordCtrl,
      'passwordConfirm': passwordConfirmCtrl,
      'birthDate' : ['2001-05-06', [Validators.required]]
    })
    this.registerForm.setValidators(identicalPasswordValidator(this.registerForm))
  }

  onSubmit() {
    if(!this.registerForm.valid)
      return;
  console.log('submit')
    this.userService.register(this.registerForm.value)
                      .subscribe(
                      user => {
                        this.userService.user = user;
                        console.log('user: ', user);
                        this.router.navigate(['/']);
                      },
                        error => console.log(error)
                    );
  }


}
