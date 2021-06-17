import { Action, ActionReducerMap } from "@ngrx/store";
import { authReducer, AuthState } from "./reducers/auth.reducer";

export interface State {
  auth: AuthState;
}

export const REDUCERS_MAP: ActionReducerMap<State, Action> = {
  auth: authReducer,
};
