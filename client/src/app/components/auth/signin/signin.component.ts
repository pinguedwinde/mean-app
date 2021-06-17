import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { State } from "@mean-app/shared/store";
import { TrySignin } from "@mean-app/shared/store/actions/auth.actions";
import { authErrorSelector } from "@mean-app/shared/store/selectors/auth.selectors";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"],
})
export class SigninComponent implements OnInit {
  public signinForm!: FormGroup;
  public error$: Observable<string>;
  public hide: boolean = true;

  constructor(private formBuilder: FormBuilder, private store: Store<State>) {}

  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
    this.error$ = this.store.pipe(select(authErrorSelector));
  }

  public trySignin() {
    this.store.dispatch(new TrySignin(this.signinForm.value));
  }
}
