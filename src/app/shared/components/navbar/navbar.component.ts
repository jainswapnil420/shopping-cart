import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AuthActions } from 'src/app/auth/store';
import { isLoggedIn, isLoggedOut } from 'src/app/auth/store/auth.selectors';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn$: Observable<boolean> = of(false);
  isLoggedOut$: Observable<boolean> = of(true);

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedIn));
    this.isLoggedOut$ = this.store.pipe(select(isLoggedOut));
  }

  logout() {
    this.router.navigateByUrl('');
    this.store.dispatch(AuthActions.logout());
  }
}
