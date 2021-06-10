import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "@mean-app/shared/services/auth.service";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"],
})
export class SigninComponent implements OnInit {
  public signinForm!: FormGroup;
  public error!: string;
  public hide: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      email: ["", Validators.required, Validators.email],
      password: ["", Validators.required, Validators.minLength(4)],
    });
  }

  public trySignin() {
    this.authService.signIn(this.signinForm.value).subscribe(
      () => this.router.navigate(["/home"]),
      (error: Error) => (this.error = error.message)
    );
  }
}
