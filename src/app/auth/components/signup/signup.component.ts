import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { noop, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth-service.service';
import { AppState } from 'src/app/reducers';
import { AuthActions } from '../../store/auth.actions';
import { MustMatch } from '../../validators/CustomValidators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup | any;
  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group(
      {
        name: ['', [Validators.required]],
        email: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.pattern(
              '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$'
            ),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
            ),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );
  }

  onSignUp() {
    if (this.signUpForm.invalid) {
      return;
    }
    this.authService
      .signUp(this.signUpForm.value)
      .pipe(
        tap((user) => {
          this.store.dispatch(AuthActions.login({ user }));
          this.router.navigateByUrl('/home');
        })
      )
      .subscribe(noop);
  }
}
