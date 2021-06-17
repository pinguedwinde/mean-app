import { authErrorSelector } from "./../../../shared/store/selectors/auth.selectors";
import { TrySignup } from "./../../../shared/store/actions/auth.actions";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { User } from "@mean-app/shared/models/user.model";
import { AuthService } from "@mean-app/shared/services/auth.service";
import { State } from "@mean-app/shared/store";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  public registrationForm!: FormGroup;
  public error$: Observable<string>;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<State>
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      confirm_password: ["", Validators.required],
    });

    this.error$ = this.store.pipe(select(authErrorSelector));
  }

  public trySignUp() {
    this.store.dispatch(new TrySignup(this.registrationForm.value));
  }
}
