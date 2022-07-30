import { Injectable } from "@angular/core";
 import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from "rxjs";
import { AuthService } from "../services/auth/auth-service.service";
import { LoginUserAction, LoginUserSuccessAction, ShoppingBasketActions } from "./app.actions";

@Injectable()

export class ShoppingBasketEffects {
 constructor(private actions$: Actions,private authService : AuthService){}
login$ = createEffect(
  () => this.actions$.pipe(
    ofType<LoginUserAction>(ShoppingBasketActions.LOGIN),
    map((action) => action.payload),
    switchMap(({email,password}) =>
     this.authService.login({ email, password }).pipe(
        map(resp =>  new LoginUserSuccessAction(resp))
     )
     )
  )
)};
