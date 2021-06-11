import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { User } from "@mean-app/shared/models/user.model";
import { AuthService } from "@mean-app/shared/services/auth.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  public registrationForm!: FormGroup;
  public error!: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      username: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      confirm_password: ["", Validators.required],
    });
  }

  public trySignUp() {
    this.authService.signUp(this.registrationForm.value).subscribe(
      (user: User) => this.router.navigate(["/login"]),
      (error) => (this.error = error.error)
    );
  }
}
