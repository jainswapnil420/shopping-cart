import { createAction, props } from "@ngrx/store";
import { User } from "../models/user.model";

export enum ShoppingBasketActions {
  LOGIN = '[Login Page] login to App',
  LOGOUT = '[LOGOUT] logout from App',
}

const login = createAction(
  ShoppingBasketActions.LOGIN,
  props<{ user: User }>()
);

const logout = createAction(ShoppingBasketActions.LOGOUT);

export const AuthActions = {
  login,
  logout
};