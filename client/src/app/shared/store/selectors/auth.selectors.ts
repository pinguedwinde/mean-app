import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "../reducers/auth.reducer";

export const authFeatureSelector = createFeatureSelector("auth");
export const authErrorSelector = createSelector(
  authFeatureSelector,
  (authState: AuthState) => {
    if (authState) {
      return authState.error;
    } else {
      return null;
    }
  }
);

export const jwtTokenSelector = createSelector(
  authFeatureSelector,
  (authState: AuthState) => {
    if (authState) {
      return authState.token;
    } else {
      return null;
    }
  }
);