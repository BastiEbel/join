import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from '../service/auth.service';

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordsDontMatch: true };
    }
    return null;
  };
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide: boolean = true;

  loginForm = this.formBuilder.group({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    private toast: HotToastService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  logIn() {
    this.authService.loading = true;
    if (!this.loginForm.valid) {
      this.authService.loading = false;
      return;
    }
    this.userLogin();
  }

  async userLogin() {
    const { email, password } = this.loginForm.value;

    await this.authService
      .loginUser(email, password)
      .pipe(
        this.toast.observe({
          success: 'Logged in successfully',
          loading: 'logging in...',
          error: 'There was an error',
        })
      )
      .subscribe((res) => {
        this.router.navigate([`/home/${res.user.uid}`]);
        this.authService.login = true;
      });
    this.authService.login = false;
  }
}
