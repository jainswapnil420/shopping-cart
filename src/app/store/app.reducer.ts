import { User } from '../auth/models/user.model';
import {
  ShoppingBasketActions,
  ShoppingBasketActionsType,
} from './app.actions';

export interface ShoppingBasketState {
  userDetails: User;
}

export const ShoppingBasketInitialState = {
  userDetails: {
    name: '',
    email: '',
  },
};

export function ShoppingBasketReducer(
  state: ShoppingBasketState = ShoppingBasketInitialState,
  action: ShoppingBasketActionsType
): ShoppingBasketState {
  switch (action.type) {
    case ShoppingBasketActions.LOGIN_SUCCESS: {
      return {
        ...state,
        userDetails: action.payload,
      };
    }
    case ShoppingBasketActions.LOGIN_FAILURE: {
      return {
        ...state,
        userDetails: { name: '', email: '' },
      };
    }
    default: {
     return state;
    }
  }
}
