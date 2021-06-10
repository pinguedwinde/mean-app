import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  public signinForm: FormGroup;
  public formBuilder: FormBuilder = new FormBuilder();
  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  public trySignin() {
    console.log(this.signinForm.value);
  }
}
