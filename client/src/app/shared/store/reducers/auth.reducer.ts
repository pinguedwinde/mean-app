import { JwtToken } from "@mean-app/shared/models/jwt-token.model";
import { User } from "@mean-app/shared/models/user.model";
import { AuthAction, AuthActionsType } from "../actions/auth.actions";

export interface AuthState {
  user: User;
  token: JwtToken;
  error: string;
}

export function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case AuthActionsType.SIGNUP_ERROR:
    case AuthActionsType.SIGNIN_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case AuthActionsType.SIGNIN_SUCCESS:
      return {
        ...state,
        token: action.payload,
        error: null,
      };
    case AuthActionsType.LOGOUT:
      return {
        ...state,
        user: null,
        token: {
          isAuthenticated: false,
          token: null,
        },
        error: null,
      };
    default:
      return state;
  }
}
