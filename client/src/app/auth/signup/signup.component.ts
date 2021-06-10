import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  public registrationForm: FormGroup;
  public formBuilder: FormBuilder = new FormBuilder();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      username: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      confirm_password: ["", Validators.required],
    });
  }

  public trySignUp() {
    console.log(this.registrationForm.value);
  }
}
