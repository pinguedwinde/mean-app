import { UserCredentials } from "@mean-app/shared/models/user-credentials.model";
import { JwtToken } from "@mean-app/shared/models/jwt-token.model";
import { User } from "@mean-app/shared/models/user.model";
import { Action } from "@ngrx/store";

export enum AuthActionsType {
  TRY_SIGNUP = "[AUTH] try signup user",
  SIGNUP_SUCCESS = "[AUTH] signup success",
  SIGNUP_ERROR = "[AUTH] signup error",

  TRY_SIGNIN = "[AUTH] try signin user",
  SIGNIN_SUCCESS = "[AUTH] signin success",
  SIGNIN_ERROR = "[AUTH] signin error",

  LOGOUT = "[AUTH] logout user",

  TRY_FETCH_USER = "[USER] try fetch user",
  FETCH_USER_SUCCESS = "[USER] fetch user sucess",
  FETCH_USER_ERROR = "[USER] fetch user error",

  TRY_REFRESH_TOKEN = "[AUTH] try refresh token",
}

export class TrySignup implements Action {
  readonly type = AuthActionsType.TRY_SIGNUP;
  constructor(public payload: User) {}
}

export class SignupSuccess implements Action {
  readonly type = AuthActionsType.SIGNUP_SUCCESS;
  constructor(public payload: JwtToken) {}
}

export class SignupError implements Action {
  readonly type = AuthActionsType.SIGNUP_ERROR;
  constructor(public payload: string) {}
}

export class TrySignin implements Action {
  readonly type = AuthActionsType.TRY_SIGNIN;
  constructor(public payload: UserCredentials) {}
}

export class SigninSuccess implements Action {
  readonly type = AuthActionsType.SIGNIN_SUCCESS;
  constructor(public payload: JwtToken) {}
}

export class SigninError implements Action {
  readonly type = AuthActionsType.SIGNIN_ERROR;
  constructor(public payload: string) {}
}

export class Logout implements Action {
  readonly type = AuthActionsType.LOGOUT;
}

export class TryFetchUser implements Action {
  readonly type = AuthActionsType.TRY_FETCH_USER;
}

export class FetchUserSuccess implements Action {
  readonly type = AuthActionsType.FETCH_USER_SUCCESS;
  constructor(public payload: User) {}
}

export class FetchUserError implements Action {
  readonly type = AuthActionsType.FETCH_USER_ERROR;
  constructor(public payload: string) {}
}

export class TryRefreshToken implements Action {
  readonly type = AuthActionsType.TRY_REFRESH_TOKEN;
}

export type AuthAction =
  | TrySignup
  | SignupSuccess
  | SignupError
  | TrySignin
  | SigninSuccess
  | SigninError
  | Logout
  | TryFetchUser
  | FetchUserSuccess
  | FetchUserError
  | TryRefreshToken;
