import { Component, OnInit } from '@angular/core';
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
import { HotToastService } from '@ngneat/hot-toast';
import { lastValueFrom, of, switchMap } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { ProfilServiceService } from '../service/profil-service.service';

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
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  hide: boolean = true;
  hide1: boolean = true;

  signUpForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
    },
    { validators: passwordsMatchValidator() }
  );
  constructor(
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public profilService: ProfilServiceService,
    private toast: HotToastService,
    public router: Router
  ) {}

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get name() {
    return this.signUpForm.get('username');
  }

  ngOnInit(): void {}

  regUser() {
    this.authService.loading = true;
    if (!this.signUpForm.valid) {
      this.authService.loading = false;
      return;
    }
    this.createUser();
  }

  /**
   * User Registration
   *
   */
  async createUser() {
    const { email, password, username } = this.signUpForm.value;
    this.authService.loading = true;
    let userInfo = await this.addUser();

    this.addToProfil(userInfo);

    this.authService.loading = false;
  }

  async addUser() {
    const { email, password, username } = this.signUpForm.value;
    return this.authService.signUp(email, password);
  }

  addToProfil(userInfo) {
    const { email, username } = this.signUpForm.value;

    return this.profilService
      .addUser({
        uid: userInfo.user.uid,
        email: email,
        displayName: username,
      })
      .pipe(
        this.toast.observe({
          success: 'Logged in successfully',
          loading: 'logging in...',
          error: 'There was an error',
        })
      );
  }
}
