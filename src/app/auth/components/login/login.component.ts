import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { noop, tap } from 'rxjs';
import { AppState } from 'src/app/reducers';
import { AuthService } from '../../service/auth-service.service';
import { AuthActions } from '../../store/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;

  constructor(private router: Router, private authService: AuthService, private store: Store<AppState>) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
        ),
      ]),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }
    this.authService.login(this.loginForm.value)
    .pipe(
      tap(user =>{
        this.store.dispatch(AuthActions.login({ user }));
        this.router.navigateByUrl('/home');
      })
    )
    .subscribe(noop);
  }
}
